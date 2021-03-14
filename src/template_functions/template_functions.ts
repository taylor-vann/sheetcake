// brian taylor vann
// template functions

import type { StyleTemplate } from "../type_flyweight/style_fixture.ts";
import type {
  AppendMediaQueryTemplate,
  AppendSelectorTemplate,
  AppendStyleTemplate,
  GetTemplateAsString,
} from "../type_flyweight/template_functions.ts";

import { getID } from "../receipt/receipt.ts";

type AppendStyleToStylesheet = (
  style: string
) => void;

const styleSheetElement = document.createElement("style");
document.head.appendChild(styleSheetElement);

let stylesheet: CSSStyleSheet | undefined;
if (styleSheetElement.sheet !== null) {
  stylesheet = styleSheetElement.sheet;
}

const appendStyleToStylesheet: AppendStyleToStylesheet = (style) => {
  if (stylesheet !== undefined) {
    stylesheet.insertRule(style, stylesheet.cssRules.length);
  }
};

const fragment: StyleTemplate = (templateArray, ...injections) => {
  return getTemplateAsStr(templateArray, injections);
};

const getTemplateAsStr: GetTemplateAsString = (templateArray, injections) => {
  const requestedStyle = [];

  const templateLength = templateArray.length;
  let index = 0;
  while (index < templateLength) {
    const templatePiece = templateArray[index];
    const injection = injections[index];

    requestedStyle.push(templatePiece);
    requestedStyle.push(injection);

    index += 1;
  }

  const templatePiece = templateArray[index];
  requestedStyle.push(templatePiece);

  return requestedStyle.join("");
};

const style: AppendStyleTemplate = ({
  prefix,
  templateArray,
  injections,
}) => {
  const id = getID(prefix);
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `.${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const keyframe: AppendStyleTemplate = ({
  prefix,
  templateArray,
  injections,
}) => {
  const id = getID(prefix);
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `@keyframes ${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const mediaQuery: AppendMediaQueryTemplate = ({
  prefix,
  query,
  fragment,
}) => {
  const id = getID(prefix);
  const constructedStyle = `@media ${query} {
    .${id} {${fragment}}
  }`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const selector: AppendSelectorTemplate = ({
  prefix,
  cssSelector,
  fragment,
}) => {
  const id = getID(prefix);
  const constructedStyle = `.${getID(id)}:${cssSelector} {${fragment}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

export { fragment, style, keyframe, mediaQuery, selector };
