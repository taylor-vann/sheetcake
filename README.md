# SheetCake

Manage CSS across progressive web apps and webcomponents in JS and TS.

Unminified and uncompressed < 5 kb

## Install

Clone Sheetcake into a codebase.

#### Deno

Import `v0.1` into a deno project.

```ts
import { style } from "https://raw.githubusercontent.com/taylor-vann/sheetcake/main/v0.1/src/sheetcake.ts";
```

#### Nodejs

Install sheetcake with `npm`.

```
npm install sheetcake
```

## How to use

Here are the most common functions in Sheetcake.

```ts
import {
  style,
  createStylesAsText,
  createCSSStyleSheet,
} from "../sheetcake";
```

### Styles

Create a CSS declaration with `style`. Styles are appended to the queued
stylesheet.

```ts
const bluebox = style`
  background-color: blue;
  color: white;
  padding: 4px 8px;
`;
```

In the example above, a classname is assigned to `bluebox` which can be assigned
to the `class` attribute of an HTMLElement.

```ts
const firstParagraph = document.querySelector("p");
firstParagraph.setAttribute("class", bluebox);
```

#### Notes for the future

Sheetcake will support constructable stylesheets as they become more widely adopted.

The suggested syntax will become:

```ts
const documentCSS = createCSSStyleSheet([bluebox]);
document.adoptedStyleSheets = [documentCSS];

const firstParagraph = document.querySelector("p");
firstParagraph.setAttribute("class", bluebox);
```

### Web components

Share styles across the document and shadow roots.

Here is an example of Sheetcake working with LitElement.

```ts
import { LitElement } from "../lit-element";

import { getStyleSheetText, queueStyleSheet, style } from "../sheetcake";

const bluebox = style`
  background-color: blue;
  color: white;
  padding: 4px 8px;
`;

const monobox = style`
  font-family: monospace;
`;

const styles = createStylesAsText([bluebox, monobox])

class MyElement extends LitElement {
  static styles = [css([styles])];

  render() {
    return html`
      <div class="${bluebox} ${monobox}">
        Hello, world!
      </div>`;
  }
}
```

#### Notes for the future

Sheetcake will support constructable stylesheets as they become more widely
adopted.

The suggested syntax will become:

```ts
const sheet = createCSSStyleSheet([bluebox, monobox])

class MyElement extends LitElement {
  constructor() {
    super();
    this.shadowRoot.adoptedStylesheets.push(sheet)
  }

  render() {
    return html`
      <div class="${bluebox} ${monobox}">
        Hello, world!
      </div>`;
  }
}
```

### Fragments

Parts of CSS declarations can be isolated as _fragments_ and reused later.
Fragments are strings.

The class `bluebox` in the examples above could be refactored with fragments
similar to the example below.

```ts
const colors = `
  background-color: blue;
  color: white;
`;

const spacing = `
  padding: 4px 8px;
`;

const bluebox = style`
  ${colors}
  ${spacing}
`;
```

### Keyframes

Create CSS animations with `keyframes`.

```ts
import { keyframes } from "../sheetcake";

const fade = keyframes`
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 0; }
`;

const flashText = style`
  animation: ${fade} 0.25s infinte;
`;
```

The example above uses `keyframes` to create an animation and sets `fade` as the
animation property in `flashText`.

### Selectors

Use `createSelector` to generate custom selector functions.

```ts
import { createSelector } from "../sheetcake.ts";

const hover = createSelector("hover");

const purpleBox = hover`
  color: white;
  background-color: purple;
`;
```

This will create a CSS declaration like the example below:

```css
.8e_3_BC:hover {
  color: white;
  background-color: purple;
}
```

### Attribute Selectors

Use `createAttribute` to return a custom attribute function.

```ts
import { createAttribute } from "../sheetcake";

const openTabAnchor = createAttribute(`target="_blank"`);

const pinkLink = openTabAnchor`
  background-color: pink;
  color: white;
  padding: 4px 8px;
`;
```

This will create a CSS declaration like the example below:

```css
.4c_2_FA[target="_blank"] {
  background-color: pink;
  color: white;
  padding: 4px 8px;
}
```

### Media Queries

Use `createMediaQuery` to generate custom media query functions.

```ts
import { createMediaQuery } from "../sheetcake";

const screen900 = createMediaQuery("screen and (min-width: 900px)");

const purpleBox = screen900`
  height: 128px;
  width: 128px;
`;
```

This will create a CSS declaration like the example below:

```css
@media screen and (min-width: 900px) {
  .3a_7_91 {
    height: 128px;
    width: 128px;
  }
}
```

### Prefixes

Use `setPrefix` to specify more custom identifiers.

```ts
import { setPrefix } from "../sheetcake";

setPrefix("SUPER_AWESOME_");

const superAwesomeBox = style`
  height: 128px;
  width: 128px;
`;
```

This will create a CSS declaration like the example below:

```css
.SUPER_AWESOME_65_7E_22 {
  height: 128px;
  width: 128px;
}
```

## License

BSD 2-Clause “Simplified” License
