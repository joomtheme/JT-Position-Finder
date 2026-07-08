# JT Position Finder — Demo

<p align="center">
  <strong>Visual Module Position Finder for Joomla Administrator</strong>
</p>

<p align="center">
  <em>Find, search, preview and select Joomla module positions directly from the module edit screen.</em>
</p>

<p align="center">
  <strong>Accessible</strong> • <strong>Atum Compatible</strong> • <strong>No Core Hacks</strong> • <strong>Light & Dark Mode Ready</strong>
</p>

---

## Overview

**JT Position Finder** is a lightweight Joomla administrator plugin that improves the module position selection workflow.

Instead of manually checking template files, remembering position names or switching between template documentation and the module edit form, administrators can open a visual position finder directly from the Joomla Administrator module edit screen.

The plugin displays available template module positions in an accessible modal interface and allows users to search, preview and select a position quickly.

JT Position Finder does not replace the native Joomla position field. It only adds a helpful visual assistant below the original field.

---

## What’s New in v1.0.4

Version `1.0.4` improves the search experience and makes the modal interface clearer when multiple templates or template styles contain similar names.

This is especially useful for cases such as:

```text
Cassiopeia
Cassiopeia Extended
Cassiopeia - Default
Cassiopeia Extended - Default
```

Improvements include:

- Exact template element matches are prioritized before partial matches
- Searching for `Cassiopeia` should show the Cassiopeia group before Cassiopeia Extended
- Template groups now show a small template element badge
- The old `Selected` label is now `Current value`
- Modal wording is clearer about what Joomla actually stores
- Search placeholder text was improved
- English and Turkish language strings were updated

---

## Important Note About Module Positions

JT Position Finder selects the value stored in Joomla’s module position field.

Joomla stores the **module position name**, for example:

```text
banner
footer
menu
sidebar-right
```

It does not store the template group from which the position was selected.

If two templates contain the same position name, the same value may appear under more than one template group. In this case, the `Current value` label means that the position name matches the current value in the Joomla module position field.

---

## Key Features

- Visual module position finder for Joomla Administrator
- Works directly inside the module edit screen
- Search positions by template group or position name
- Improved search ranking for similar template names
- Exact template element matches are prioritized
- Shows template element badges
- Shows used and unused module positions
- Supports custom position input
- Keyboard-friendly modal behavior
- ESC key support
- Focus-friendly interface
- Screen-reader friendly structure
- Atum administrator template compatible
- Light mode and dark mode support
- No Joomla core modifications
- No Atum template modifications
- No Bootstrap core modifications
- No external CSS framework
- No CDN dependency
- Joomla Web Asset Manager based

---

## Light Mode Preview

The plugin integrates naturally with Joomla Administrator light mode and keeps the native Atum interface style.

### Position Field Helper

![JT Position Finder button in Joomla administrator light mode](./images/jt_admin_module_find_button.png)

The **Find position** button is added below the Joomla module position field without replacing or modifying the original field.

### Position Finder Modal

![JT Position Finder modal in Joomla administrator light mode](./images/jt_admin_module_modal.png)

The modal lists available template positions grouped by template, with search support, usage indicators and clearer current value handling.

---

## Dark Mode Preview

JT Position Finder also works cleanly with Joomla Administrator dark mode.

### Position Field Helper — Dark Mode

![JT Position Finder button in Joomla administrator dark mode](./images/jt_admin_module_find_button_dark.png)

The button follows the administrator interface style and remains readable in dark mode.

### Position Finder Modal — Dark Mode

![JT Position Finder modal in Joomla administrator dark mode](./images/jt_admin_module_modal_dark.png)

The modal remains usable, readable and keyboard-friendly in dark mode.

---

## How It Works

1. Open Joomla Administrator.
2. Go to **Content → Site Modules**.
3. Create or edit a module.
4. Find the native **Position** field.
5. Click **Find position**.
6. Search or browse available template module positions.
7. Select a position or enter a custom value.
8. The selected value is inserted into the Joomla module position field.

The original Joomla position field remains available and unchanged.

---

## Installation

1. Download the latest release package:

   ```text
   plg_system_jtpositionfinder_v1.0.4.zip
   ```

2. Open Joomla Administrator.

3. Go to:

   ```text
   System → Install Extensions
   ```

4. Upload and install the package.

5. Go to:

   ```text
   System → Plugins
   ```

6. Search for:

   ```text
   System - JT Position Finder
   ```

7. Enable the plugin.

8. Open a module edit page and use the **Find position** button.

---

## Recommended Test Case

To test the improved v1.0.4 search behavior:

1. Install or update to `v1.0.4`.
2. Open Joomla Administrator.
3. Go to **Content → Site Modules**.
4. Create or edit a module.
5. Click **Find position**.
6. Search for:

   ```text
   Cassiopeia
   ```

Expected behavior:

```text
Cassiopeia should appear before Cassiopeia Extended when the exact template element matches.
```

This makes the interface clearer when similar template names or template style names are installed.

---

## Compatibility

| Requirement | Status |
| --- | --- |
| Joomla 6.1+ | Supported |
| PHP 8.3+ | Supported |
| Joomla Administrator | Supported |
| Atum Template | Supported |
| Light Mode | Supported |
| Dark Mode | Supported |
| Web Asset Manager | Used |
| Joomla Core Hacks | No |
| Bootstrap Core Changes | No |
| External CDN | No |

---

## Accessibility Notes

Accessibility is an important part of JT Position Finder.

The modal interface is designed to support a better administrator workflow with:

- Keyboard navigation
- ESC close behavior
- Focus handling
- Clear button labels
- Screen-reader friendly modal structure
- Searchable position list
- Readable usage indicators
- Clear current value indication

This makes the extension useful not only for developers, but also for site builders, agencies, administrators and users who manage complex Joomla module layouts.

---

## Why This Plugin?

Joomla module positions are powerful, but selecting the correct position can be difficult when working with multiple templates or complex layouts.

Administrators may need to remember position names, inspect template files or check template documentation.

JT Position Finder solves this by making positions visible, searchable and selectable directly inside the administrator module edit screen.

It improves the workflow without changing how Joomla works internally.

---

## No Core Modifications

JT Position Finder does **not** modify:

- Joomla core files
- Joomla administrator template files
- Atum files
- Bootstrap files
- Template files
- Module files

The plugin works through Joomla’s extension system and Web Asset Manager.

---

## Recommended Use Cases

JT Position Finder is useful for:

- Joomla site builders
- Template developers
- Web agencies
- Joomla administrators
- Multilingual websites
- Complex module layouts
- Sites using many module positions
- Users who want a faster module editing workflow
- Users who prefer a visual and searchable position selector
- Users working with similar template names or template style names

---

## Screenshots Included

This demo page uses the following screenshots:

```text
docs/demo/images/jt_admin_module_find_button.png
docs/demo/images/jt_admin_module_find_button_dark.png
docs/demo/images/jt_admin_module_modal.png
docs/demo/images/jt_admin_module_modal_dark.png
```

---

## Project Links

- Main Repository: [JT Position Finder](https://github.com/joomtheme/JT-Position-Finder)
- Releases: [GitHub Releases](https://github.com/joomtheme/JT-Position-Finder/releases)
- Joomla Turkey: [JoomlaTR](https://www.joomlatr.org)
- Maintainer: [JoomTheme](https://github.com/joomtheme)

---

## License

JT Position Finder is licensed under the **GNU General Public License v2 or later**.

---

<p align="center">
  <strong>JT Position Finder</strong><br>
  Accessible module position selection for Joomla Administrator.
</p>
