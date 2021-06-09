# Changelog

All notable changes to this project will be documented in this file.

The format is loosely based on
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

Sheetcake repects [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Minor patches are placed in their own directories. Patches are bucketed into the
directory of their minor version.

## [0.1.4] - 2021-06-07

### Removed

- `sheet::queueStyleSheet`
- `sheet::getStyleSheet`
- `sheet::getStyleSheetText` 

### Added

- `sheet::createCSSStyleSheet` - given an array of classnames, return a CSSStyleSheet
- `sheet::createStyleSheetAsText` given an array of classnames, return text representing a CSS document.

## [0.1.3] - 2021-05-18

### Added

- `sheet::queueStyleSheet` function to queue a stylesheet for editing
- `sheet::getStyleSheet` function to return a CSSStyleSheet
- `sheet::getStyleSheetText` function to return a CSSStyleSheet as text

### Changed

- stylesheets must be declared, there is no longer a single stylesheet
- webcomponents are supported through `sheet::getStyleSheetText`

## [0.1.1] - 2021-05-08

### Added

- `sheet::setPrefix` function for custom labels

## [0.1.0] - 2021-04-09

### Added

- `sheet/` creates stylesheets and style indexes
- `template_functions` creates CSS "declarators" as well as factory methods to
  generate selectors and media queries.

[0.1.0]: https://github.com/taylor-vann/sheetcake/v0.1
