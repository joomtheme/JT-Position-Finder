<?php
/**
 * @package     JT Position Finder
 * @subpackage  Plugin.System.Jtpositionfinder
 *
 * @copyright   (C) 2026 JoomTheme. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

defined('_JEXEC') or die;

use Joomla\CMS\Extension\PluginInterface;
use Joomla\CMS\Factory;
use Joomla\CMS\Plugin\PluginHelper;
use Joomla\DI\Container;
use Joomla\DI\ServiceProviderInterface;
use JoomTheme\Plugin\System\Jtpositionfinder\Extension\Jtpositionfinder;

return new class () implements ServiceProviderInterface {
    public function register(Container $container): void
    {
        $container->set(
            PluginInterface::class,
            $container->lazy(
                Jtpositionfinder::class,
                static function (Container $container): Jtpositionfinder {
                    $config = (array) PluginHelper::getPlugin('system', 'jtpositionfinder');
                    $plugin = new Jtpositionfinder($config);
                    $plugin->setApplication(Factory::getApplication());

                    return $plugin;
                }
            )
        );
    }
};
