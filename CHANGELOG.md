# Changelog

All notable changes to **JT Position Finder** will be documented in this file.

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
