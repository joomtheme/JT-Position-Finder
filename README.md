# System - JT Position Finder

**JT Position Finder** is a Joomla administrator plugin that adds an accessible position finder to the module edit screen.

It helps site administrators quickly search, browse, and select module positions grouped by template, without manually guessing position names.

Developed by [JoomTheme](https://joomtheme.com).

---

## Features

- Adds a **Find Position** button to the Joomla module edit screen
- Displays available module positions in an accessible modal
- Groups module positions by template
- Shows whether a position is already used or unused
- Highlights the currently selected position
- Supports custom/manual position values
- Supports keyboard navigation
- Provides basic accessibility support
- Uses Joomla administrator UI conventions
- Built for the **Atum** administrator template
- Uses **Bootstrap 5** classes provided by Joomla
- No external CSS framework
- No heavy UI dependency

---

## Accessibility

JT Position Finder includes accessibility-focused behavior for the modal and result list.

Supported accessibility features include:

- `role="dialog"`
- `aria-modal`
- `aria-describedby`
- `aria-live` result announcements
- ESC key support
- Focus trap inside the modal
- Focus return after closing
- Keyboard navigation for position results
- Clear button labels for screen readers

---

## Requirements

- Joomla **6.1+**
- PHP **8.3+**
- Joomla Administrator template: **Atum**
- Modern browser with JavaScript enabled

---

## Installation

1. Download the latest release ZIP file from GitHub Releases.
2. In Joomla Administrator, go to:

   `System -> Install -> Extensions`

3. Upload the package:

   `plg_system_jtpositionfinder_vX.X.X.zip`

4. Go to:

   `System -> Manage -> Plugins`

5. Search for:

   `System - JT Position Finder`

6. Enable the plugin.

---

## Usage

1. Open Joomla Administrator.
2. Go to:

   `Content -> Site Modules`

3. Edit an existing module or create a new one.
4. Locate the **Position** field.
5. Click the **Find Position** button.
6. Search or browse positions grouped by template.
7. Select a position.
8. The selected position is applied to the module position field.

---

## Update Server

This extension supports Joomla update server integration.

Update XML:

`https://raw.githubusercontent.com/joomtheme/JT-Position-Finder/main/updates/update.xml`

Changelog XML:

`https://raw.githubusercontent.com/joomtheme/JT-Position-Finder/main/updates/changelog.xml`

---

## Repository Structure

```text
JT-Position-Finder/
├── updates/
│   ├── update.xml
│   └── changelog.xml
├── README.md
└── release packages
```

The installable Joomla plugin package is distributed through GitHub Releases.

---

## Release Package

The Joomla installable package format is:

```text
plg_system_jtpositionfinder_vX.X.X.zip
```

Example:

```text
plg_system_jtpositionfinder_v1.0.2.zip
```

---

## GitHub Release Notes Example

```text
System - JT Position Finder 1.0.2

Stable release for Joomla 6.1+.

Highlights:
- Adds an accessible module position finder to the Joomla module edit screen
- Groups positions by template
- Supports used/unused status badges
- Supports custom position values
- Uses Joomla Atum and Bootstrap 5 UI conventions
- Includes Joomla update server and changelog support
```

---

## Changelog

See:

`updates/changelog.xml`

---

## Developer

**JoomTheme**

Website: [https://joomtheme.com](https://joomtheme.com)  
Support: [support@joomtheme.com](mailto:support@joomtheme.com)
Issues: [https://github.com/joomtheme/JT-Position-Finder/issues](https://github.com/joomtheme/JT-Position-Finder/issues)

---

## License

GNU General Public License version 2 or later.

---

## Credits and Trademark Notice

JT Position Finder is an independent extension developed by JoomTheme with appreciation for the Joomla project and its community.

The extension follows Joomla administrator UI conventions to feel familiar for Joomla users, but it is not an official Joomla core extension and is not affiliated with or endorsed by Open Source Matters, Inc.

Joomla!® is a registered trademark of Open Source Matters, Inc.
