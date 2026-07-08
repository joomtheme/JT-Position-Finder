<?php
/**
 * @package     JT Position Finder
 * @subpackage  Plugin.System.Jtpositionfinder
 *
 * @copyright   (C) 2026 JoomTheme. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

namespace JoomTheme\Plugin\System\Jtpositionfinder\Extension;

\defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Language\Text;
use Joomla\CMS\Plugin\CMSPlugin;
use Joomla\Database\DatabaseInterface;
use Joomla\Event\SubscriberInterface;
use SimpleXMLElement;
use Throwable;

/**
 * Adds an accessible module position finder to the administrator module edit form.
 */
final class Jtpositionfinder extends CMSPlugin implements SubscriberInterface
{
    /**
     * Automatically load the plugin language files.
     *
     * @var bool
     */
    protected $autoloadLanguage = true;

    public static function getSubscribedEvents(): array
    {
        return [
            'onBeforeCompileHead' => 'addAssets',
        ];
    }

    /**
     * Register and load the admin script only on com_modules edit screens.
     */
    public function addAssets(): void
    {
        $app = $this->getApplication();

        if (!$app->isClient('administrator')) {
            return;
        }

        $input = $app->getInput();

        if ($input->getCmd('option') !== 'com_modules' || $input->getCmd('view') !== 'module') {
            return;
        }

        $clientId = $this->resolveClientId();
        $document = $app->getDocument();
        $data = $this->buildOptions($clientId);

        if (empty($data['templates']) && empty($data['customPositions'])) {
            return;
        }

        $wa = $document->getWebAssetManager();
        $wa->getRegistry()->addExtensionRegistryFile('plg_system_jtpositionfinder');
        $wa->useScript('plg_system_jtpositionfinder.admin');

        $document->addScriptOptions('plg_system_jtpositionfinder', $data);
    }

    /**
     * Resolve site/admin module context. Existing module records are authoritative.
     */
    private function resolveClientId(): int
    {
        $input = $this->getApplication()->getInput();
        $clientId = $input->getInt('client_id', 0);
        $moduleId = $input->getInt('id', 0);

        if ($moduleId <= 0) {
            return $clientId;
        }

        try {
            $db = $this->getDatabase();
            $query = $db->getQuery(true)
                ->select($db->quoteName('client_id'))
                ->from($db->quoteName('#__modules'))
                ->where($db->quoteName('id') . ' = :id')
                ->bind(':id', $moduleId);

            $db->setQuery($query);
            $value = $db->loadResult();

            if ($value !== null) {
                return (int) $value;
            }
        } catch (Throwable $exception) {
            // Fall back to the request value. The enhancement should never break the edit screen.
        }

        return $clientId;
    }

    /**
     * Build the data object consumed by the JavaScript UI.
     */
    private function buildOptions(int $clientId): array
    {
        $templates = $this->getTemplates($clientId);
        $usageCounts = $this->getPositionUsageCounts($clientId);
        $knownPositions = [];

        foreach ($templates as &$template) {
            foreach ($template['positions'] as &$position) {
                $name = $position['value'];
                $knownPositions[$name] = true;
                $position['used'] = $usageCounts[$name] ?? 0;
            }
            unset($position);
        }
        unset($template);

        $customPositions = [];

        foreach ($usageCounts as $position => $count) {
            if (!isset($knownPositions[$position])) {
                $customPositions[] = [
                    'value' => $position,
                    'label' => $position,
                    'used'  => $count,
                ];
            }
        }

        usort(
            $customPositions,
            static fn(array $a, array $b): int => strnatcasecmp($a['value'], $b['value'])
        );

        return [
            'fieldId'         => 'jform_position',
            'clientId'        => $clientId,
            'templates'       => $templates,
            'customPositions' => $customPositions,
            'strings'         => $this->getStrings(),
        ];
    }

    /**
     * Load installed template names, default status and XML-defined positions.
     */
    private function getTemplates(int $clientId): array
    {
        $templates = [];

        try {
            $db = $this->getDatabase();
            $query = $db->getQuery(true)
                ->select([
                    $db->quoteName('extension_id'),
                    $db->quoteName('element'),
                    $db->quoteName('name'),
                ])
                ->from($db->quoteName('#__extensions'))
                ->where($db->quoteName('type') . ' = ' . $db->quote('template'))
                ->where($db->quoteName('client_id') . ' = :client_id')
                ->where($db->quoteName('enabled') . ' = 1')
                ->order($db->quoteName('element') . ' ASC')
                ->bind(':client_id', $clientId);

            $db->setQuery($query);
            $rows = $db->loadObjectList();
            $styles = $this->getTemplateStyles($clientId);

            foreach ($rows as $row) {
                $positions = $this->readTemplatePositions((string) $row->element, $clientId);

                if (!$positions) {
                    continue;
                }

                $templateStyles = $styles[(string) $row->element] ?? [];
                $isDefault = false;
                $styleTitles = [];

                foreach ($templateStyles as $style) {
                    $styleTitles[] = $style['title'];

                    if ($style['home']) {
                        $isDefault = true;
                    }
                }

                $templates[] = [
                    'name'       => (string) $row->element,
                    'title'      => $this->getTemplateTitle($row->name, (string) $row->element, $styleTitles),
                    'isDefault'  => $isDefault,
                    'positions'  => $positions,
                ];
            }
        } catch (Throwable $exception) {
            return [];
        }

        usort(
            $templates,
            static function (array $a, array $b): int {
                if ($a['isDefault'] !== $b['isDefault']) {
                    return $a['isDefault'] ? -1 : 1;
                }

                return strnatcasecmp($a['title'], $b['title']);
            }
        );

        return $templates;
    }

    /**
     * Load style titles and default flags for installed templates.
     */
    private function getTemplateStyles(int $clientId): array
    {
        $styles = [];

        try {
            $db = $this->getDatabase();
            $query = $db->getQuery(true)
                ->select([
                    $db->quoteName('template'),
                    $db->quoteName('title'),
                    $db->quoteName('home'),
                ])
                ->from($db->quoteName('#__template_styles'))
                ->where($db->quoteName('client_id') . ' = :client_id')
                ->order($db->quoteName('title') . ' ASC')
                ->bind(':client_id', $clientId);

            $db->setQuery($query);

            foreach ($db->loadObjectList() as $style) {
                $template = (string) $style->template;

                if (!isset($styles[$template])) {
                    $styles[$template] = [];
                }

                $styles[$template][] = [
                    'title' => (string) $style->title,
                    'home'  => (string) $style->home !== '0',
                ];
            }
        } catch (Throwable $exception) {
            return [];
        }

        return $styles;
    }

    /**
     * Read positions from templateDetails.xml.
     */
    private function readTemplatePositions(string $template, int $clientId): array
    {
        $base = $clientId === 1 ? JPATH_ADMINISTRATOR : JPATH_SITE;
        $file = $base . '/templates/' . $template . '/templateDetails.xml';

        if (!is_file($file) || !is_readable($file)) {
            return [];
        }

        $previous = libxml_use_internal_errors(true);

        try {
            $xml = simplexml_load_file($file, SimpleXMLElement::class, LIBXML_NONET);
        } catch (Throwable $exception) {
            return [];
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }

        if (!$xml instanceof SimpleXMLElement || !isset($xml->positions->position)) {
            return [];
        }

        $positions = [];
        $seen = [];

        foreach ($xml->positions->position as $position) {
            $value = trim((string) $position);

            if ($value === '' || isset($seen[$value])) {
                continue;
            }

            $seen[$value] = true;
            $positions[] = [
                'value' => $value,
                'label' => $value,
                'used'  => 0,
            ];
        }

        usort(
            $positions,
            static fn(array $a, array $b): int => strnatcasecmp($a['value'], $b['value'])
        );

        return $positions;
    }

    /**
     * Count module records using each position. Trashed modules are ignored.
     */
    private function getPositionUsageCounts(int $clientId): array
    {
        $counts = [];

        try {
            $db = $this->getDatabase();
            $query = $db->getQuery(true)
                ->select([
                    $db->quoteName('position'),
                    'COUNT(*) AS ' . $db->quoteName('total'),
                ])
                ->from($db->quoteName('#__modules'))
                ->where($db->quoteName('client_id') . ' = :client_id')
                ->where($db->quoteName('position') . ' <> ' . $db->quote(''))
                ->where($db->quoteName('published') . ' <> -2')
                ->group($db->quoteName('position'))
                ->order($db->quoteName('position') . ' ASC')
                ->bind(':client_id', $clientId);

            $db->setQuery($query);

            foreach ($db->loadObjectList() as $row) {
                $counts[(string) $row->position] = (int) $row->total;
            }
        } catch (Throwable $exception) {
            return [];
        }

        return $counts;
    }

    private function getTemplateTitle(string $languageKey, string $element, array $styleTitles): string
    {
        $translated = Text::_($languageKey);
        $title = $translated !== $languageKey ? $translated : ucfirst(str_replace('_', ' ', $element));

        if ($styleTitles) {
            $unique = array_values(array_unique($styleTitles));
            $title .= ' — ' . implode(', ', array_slice($unique, 0, 3));

            if (count($unique) > 3) {
                $title .= ' +' . (count($unique) - 3);
            }
        }

        return $title;
    }

    private function getStrings(): array
    {
        return [
            'button'             => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_BUTTON'),
            'modalTitle'         => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_MODAL_TITLE'),
            'modalDescription'   => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_MODAL_DESCRIPTION'),
            'close'              => Text::_('JCLOSE'),
            'searchLabel'        => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_SEARCH_LABEL'),
            'searchPlaceholder'  => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_SEARCH_PLACEHOLDER'),
            'defaultTemplate'    => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_DEFAULT_TEMPLATE'),
            'usedBy'             => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_USED_BY'),
            'usedBySingular'     => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_USED_BY_SINGULAR'),
            'usedByPlural'       => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_USED_BY_PLURAL'),
            'unused'             => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_UNUSED'),
            'customGroup'        => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_CUSTOM_GROUP'),
            'customLabel'        => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_CUSTOM_LABEL'),
            'customPlaceholder'  => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_CUSTOM_PLACEHOLDER'),
            'useCustom'          => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_USE_CUSTOM'),
            'noResults'          => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_NO_RESULTS'),
            'resultSingular'     => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_RESULT_SINGULAR'),
            'resultPlural'       => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_RESULT_PLURAL'),
            'selected'           => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_SELECTED'),
            'currentValue'       => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_CURRENT_VALUE'),
            'ariaChoose'         => Text::_('PLG_SYSTEM_JTPOSITIONFINDER_ARIA_CHOOSE'),
        ];
    }

    private function getDatabase(): DatabaseInterface
    {
        return Factory::getContainer()->get(DatabaseInterface::class);
    }
}
