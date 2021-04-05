import type { StyleTemplate } from "../type_flyweight/style_fixture.ts";

import {
  createMediaQuery,
  createSelector,
} from "../template_functions/template_functions.ts";

const focus: StyleTemplate = createSelector("focus");
const hover: StyleTemplate = createSelector("hover");
const checked: StyleTemplate = createSelector("checked");
const valid: StyleTemplate = createSelector("valid");
const invalid: StyleTemplate = createSelector("invalid");
const required: StyleTemplate = createSelector("required");
const disabled: StyleTemplate = createSelector("disabled");

const screen641: StyleTemplate = createMediaQuery(
  "screen and (min-width: 641px)"
);
const screen1008: StyleTemplate = createMediaQuery(
  "screen and (min-width: 1008px)"
);
const landscape: StyleTemplate = createMediaQuery(
  "screen and (orientation: landscape)"
);
const portrait: StyleTemplate = createMediaQuery(
  "screen and (orientation: portrait)"
);
const print: StyleTemplate = createMediaQuery("print");

export {
  checked,
  disabled,
  focus,
  hover,
  invalid,
  landscape,
  portrait,
  print,
  required,
  screen1008,
  screen641,
  valid,
};
