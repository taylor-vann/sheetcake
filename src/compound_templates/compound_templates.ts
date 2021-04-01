import type { StyleTemplate } from "../type_flyweight/style_fixture.ts";

import {
  mediaQuery,
  selector,
} from "../template_functions/template_functions.ts";

const selectors = ["focus", "hover", "checked", "valid", "invalid", "required", "disabled", "first-child", "last-child"];

const focus: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "focus", templateArray, injections });
};

const hover: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "hover", templateArray, injections });
};

const checked: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "checked", templateArray, injections });
};

const valid: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "valid", templateArray, injections });
};

const invalid: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "invalid", templateArray, injections });
};

const required: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "required", templateArray, injections });
};

const disabled: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "disabled", templateArray, injections });
};

const firstChild: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "first-child", templateArray, injections });
};

const lastChild: StyleTemplate = (templateArray, ...injections) => {
  return selector({ selector: "last-child", templateArray, injections });
};

const screen641: StyleTemplate = (templateArray, ...injections) => {
  return mediaQuery({
    mediaQuery: "screen and (min-width: 641px)",
    templateArray,
    injections,
  });
};

const screen1008: StyleTemplate = (templateArray, ...injections) => {
  return mediaQuery({
    mediaQuery: "screen and (min-width: 1008px)",
    templateArray,
    injections,
  });
};

const landscape: StyleTemplate = (templateArray, ...injections) => {
  return mediaQuery({
    mediaQuery: "screen and (orientation: landscape)",
    templateArray,
    injections,
  });
};

const portrait: StyleTemplate = (templateArray, ...injections) => {
  return mediaQuery({
    mediaQuery: "screen and (orientation: portrait)",
    templateArray,
    injections,
  });
};

const print: StyleTemplate = (templateArray, ...injections) => {
  return mediaQuery({
    mediaQuery: "print",
    templateArray,
    injections,
  });
};

export {
  checked,
  disabled,
  focus,
  firstChild,
  hover,
  invalid,
  landscape,
  lastChild,
  portrait,
  print,
  required,
  screen1008,
  screen641,
  valid,
};
