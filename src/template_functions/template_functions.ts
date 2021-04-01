// brian taylor vann
// template functions

import type { StyleTemplate } from "../type_flyweight/style_fixture.ts";
import type {
  GetTemplate,
  GetSelector,
  GetMediaQuery,
} from "../type_flyweight/template_functions.ts";
import { stylesheet, stylesheetIndex } from "../sheet/sheet.ts";

import { getID } from "../receipt/receipt.ts";

type AppendStyleToStylesheet = (style: string) => void;

const getTemplateAsStr: GetTemplate = (templateArray, injections) => {
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

const appendStyleToStylesheet: AppendStyleToStylesheet = (style) => {
  if (stylesheet !== undefined) {
    stylesheet.insertRule(style, stylesheet.cssRules.length);
  }
};

const style: StyleTemplate = (templateArray, ...injections) => {
  const id = getID(stylesheetIndex);
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `.${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const keyframe: StyleTemplate = (templateArray, ...injections) => {
  const id = getID(stylesheetIndex);
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `@keyframes ${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const selector: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID(stylesheetIndex);
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `.${id}:${selector} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const mediaQuery: GetMediaQuery = ({
  mediaQuery,
  selector,
  templateArray,
  injections,
}) => {
  const id = getID(stylesheetIndex);
  const template = getTemplateAsStr(templateArray, injections);

  let constructedStyle = `@media ${mediaQuery} {
    .${id} {${template}}
  }`;

  if (selector !== undefined) {
    constructedStyle = `@media ${mediaQuery} {
      .${id}:${selector} {${template}}
    }`;
  }

  appendStyleToStylesheet(constructedStyle);

  return id;
};

export {
  keyframe,
  mediaQuery,
  selector,
  style,
};
