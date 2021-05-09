# SheetCake

Dead reckon CSS in JS and TS.

Unminified and uncompressed < 4 kb

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

### Styles

Create a CSS declaration with the `style` function.

```ts
const bluebox = style`
  color: white;
  background-color: blue;
`;
```

An optimistically unique classname is assigned to `bluebox` to be referenced in
the `class` attribute of an HTMLElement.

Here is an example of Sheetcake working with LitElement:

```ts
import { style } from "../sheetcake";
import { LitElement } from "../lit-element";

const bluebox = style`
  color: white;
  background-color: blue;
`;

class MyElement extends LitElement {
  render() {
    return html` <div class="${bluebox}">Hello, world!</div> `;
  }
}
```

### Fragments

Parts of CSS declarations can be isolated as _fragments_ and reused later.

```ts
const borders = `
  border: 1px solid #efefef;
`;

const mediumTile = `
  height: 128px;
  width: 128px;
`;

const bluebox = style`
  ${borders}
  ${mediumTile}
  color: white;
  background-color: blue;
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

The example above creates an animation with `keyframes`, assigns a classname to `fade`, and sets `fade` as the `animation` property in `flashText`.

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
import { setPrefix } from "sheetcake";

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
