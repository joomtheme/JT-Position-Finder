# Changelog

All notable changes to **JT Position Finder** will be documented in this file.

## [1.0.4] - 2026-07-08

### Added

* Added visible template element badges in the position finder modal.
* Added clearer template group identification for similar template names.
* Added improved language strings for search and modal descriptions.
* Added clearer wording to explain that Joomla stores the module position value, not the template group.

### Changed

* Updated package version to `1.0.4`.
* Updated Web Asset Manager metadata to version `1.0.4`.
* Improved search ranking for template groups.
* Exact template element matches are now prioritized before partial matches.
* Searching for `Cassiopeia` should now show the Cassiopeia group before Cassiopeia Extended.
* Changed the `Selected` label to `Current value`.
* Updated the search placeholder text.
* Updated modal description text.
* Updated English language files.
* Updated Turkish language files.
* Updated Joomla update server metadata for version `1.0.4`.

### Fixed

* Improved UX when multiple templates or template styles contain similar names.
* Reduced confusion when the same module position value exists under more than one template group.
* Clarified that selecting a position inserts the position value into the Joomla module position field.

### Notes

* This is a UX improvement release based on real-world feedback.
* No Joomla core files are modified.
* No Atum administrator template files are modified.
* No Bootstrap core files are modified.
* No frontend template files are modified.
* No external CSS framework or CDN dependency is used.
* Plugin must be enabled manually after installation.

## [1.0.3] - 2026-07-08

### Added

* Added `LICENSE.txt` for GPL/JED compliance.
* Added explicit plugin element metadata in the Joomla manifest.
* Added update server and changelog metadata for Joomla Extension Directory readiness.
* Added accessibility-focused modal behavior for administrator module position selection.

### Changed

* Updated package version to `1.0.3`.
* Updated Web Asset Manager metadata to version `1.0.3`.
* Improved Joomla manifest metadata for clearer extension identification.
* Removed automatic plugin enable behavior after installation.
* Improved modal open/close handling to avoid duplicate modal or backdrop creation.

### Security

* Hardened template XML reading with safer libxml handling.
* Disabled network access while parsing template XML files.
* Improved handling of invalid or unreadable template XML files.

### Notes

* No Joomla core files are modified.
* No Atum administrator template files are modified.
* No Bootstrap core files are modified.
* No external CSS framework or CDN dependency is used.
* Plugin must be enabled manually after installation.

## [1.0.2] - Previous internal package

### Notes

* Internal preparation package before JED-ready cleanup.
* Superseded by version `1.0.3`.
