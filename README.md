# SheetCake

Create CSS in TS / JS. 

Unminified and uncompressed < 5 kb

## Abstract

Sheetcake is an alternative to modular CSS for buildless environments.

## Install

Clone Sheetcake and copy a version into your codebase.

### ESModules

Load `v0` into browser scope.

#### HTML
```
<head>
  <link
    rel="modulepreload"
    href="https://raw.githubusercontent.com/taylor-vann/sheetcake/main/dist/v0/esmodules/sheetcake.js">
  </link>
</head>

...

<script
  type="module"
  src="https://raw.githubusercontent.com/taylor-vann/sheetcake/main/dist/v0/esmodules/sheetcake.js">
</script>
```

#### ECMAScript
```
import { style } from "https://raw.githubusercontent.com/taylor-vann/sheetcake/main/dist/v0/esmodules/sheetcake.js";
```

#### Deno / Typescript

Import `v0` into a deno project.

```
import { style } from "https://raw.githubusercontent.com/taylor-vann/sheetcake/main/v0/srcsheetcake.ts";
```


## How to use

### Styles

Create a CSS declaration with the `style` function.

```
const bluebox = style`
  color: white;
  background-color: blue;
`;
```

A classname is assigned to `bluebox` to be used in the `class` attribute of an HTMLElement.

Here is an example of using Sheetcake with LitElement:

```
import { style } from "../sheetcake";
import { LitElement } from "lit-element";

const bluebox = style`
  color: white;
  background-color: blue;
`;

class MyElement extends LitElement {
	render() {
		return html`
			<div class="${bluebox}">Hello, world!</div>
		`;
	}
}
```

### Fragments

Parts of CSS declarations can be isolated as *fragments* and reused later.

```
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

### Selectors

Sheetcake has template functions for common CSS selectors:

```
import { hover, focus } from "../sheetcake.js";

const hoverBox = hover`
  background-color: orange;
`;

const focusBox = focus`
  background-color: plum;
`;
```

Not every CSS selector has a corresponding function. Use `createSelector` to generate custom selector functions.

```
import { createSelector } from "../sheetcake.js";

const focusWithin = createSelector("focus-within");

const purpleBox = focusWithin`
  color: white;
  background-color: purple;
`;
```

This will create CSS like the example below:

```
.cake_2_EF:focus-within {
  color: white;
  background-color: purple
}
```

### Attributes

Use `createAttribute` to return a custom attribute function.

```
import { createAttribute } from "../sheetcake.js";

const openTab = createAttribute(`target="_blank"`);

const pinkLink = openTab`
  background-color: pink;
  color: white;
  padding: 4px 8px;
`;
```

This will create CSS like the example below:

```
.cake_2_FA[target="_blank"] {
  background-color: pink;
  color: white;
  padding: 4px 8px;
}
```

### Media Queries

Sheetcake has template functions for common media queries:

```
import { landscape } from "../sheetcake.js";

const printMedia = landscape`
  max-width: 200px;
`;
```

Use `createMediaQuery` to generate custom media query functions.

```
import { createMediaQuery } from "../sheetcake.js";

const screen900 = createMediaQuery("screen and (min-width: 900px)");

const purpleBox = screen900`
  height: 128px;
  width: 128px;
`;
```

This will create CSS like the example below:

```
@media screen and (min-width: 900px) {
  .cake_2_EF:focus-within {
    height: 128px;
    width: 128px;
  }
}
```

### Keyframes

CSS animations are created with `keyframes`.

```
import { keyframes } from "../sheetcake.js";

const fade = keyframes`
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 0; }
`;

const flashText = hover`
  animation: ${fade} 0.25s infinte;
`;
```

The example above creates an animation with `keyframes` and returns the class name. The class name is used in the `animation` property in `focus`.

## License

BSD 2-Clause “Simplified” License