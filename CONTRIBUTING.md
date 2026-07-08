# Contributing to JT Position Finder

Thank you for your interest in contributing to **JT Position Finder**.

JT Position Finder is a Joomla administrator plugin designed to improve the module position selection workflow without modifying Joomla core, Atum, Bootstrap, or template files.

## Project Goals

Contributions should follow these goals:

* Keep the extension lightweight.
* Preserve Joomla core compatibility.
* Do not modify Joomla core files.
* Do not modify Atum administrator template files.
* Do not modify Bootstrap core files.
* Use Joomla’s Web Asset Manager for assets.
* Avoid external CDN dependencies.
* Keep the interface accessible and keyboard-friendly.
* Keep the extension multilingual-ready.

## Requirements

Before submitting changes, please test with:

* Joomla 6.1 or newer
* PHP 8.3 or newer
* Atum administrator template
* Administrator module edit screen

## Coding Guidelines

Please follow Joomla extension development practices:

* Use namespaced PHP classes.
* Use Joomla CMS APIs where possible.
* Escape output where applicable.
* Avoid inline scripts when Web Asset Manager can be used.
* Avoid unnecessary dependencies.
* Keep JavaScript accessible and progressive.
* Keep language strings in language files.
* Do not add custom CSS unless there is a strong reason.

## Pull Requests

When submitting a pull request:

1. Describe the purpose of the change.
2. Explain how it was tested.
3. Mention the Joomla and PHP versions used for testing.
4. Include screenshots or screen recordings for UI changes when useful.
5. Keep pull requests focused on one topic.

## Accessibility

Accessibility is an important part of this extension.

Please make sure UI-related changes preserve or improve:

* Keyboard navigation
* ESC close behavior
* Focus handling
* Screen-reader friendly labels
* Clear button text
* Logical modal behavior

## Security

Please do not report security issues in public issues.

Use the instructions in `SECURITY.md` for responsible disclosure.

## License

By contributing to this project, you agree that your contributions will be licensed under the GNU General Public License v2 or later.
