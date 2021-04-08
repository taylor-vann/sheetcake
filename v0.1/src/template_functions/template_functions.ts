// brian taylor vann
// template functions

import type {
  StyleTemplate,
  CreateSelectorTemplate,
  CreateQueryTemplate,
} from "../type_flyweight/style_fixture.ts";
import type {
  GetTemplate,
  GetSelector,
  GetMediaQuery,
} from "../type_flyweight/template_functions.ts";

import { stylesheet, stylesheetIndex } from "../sheet/sheet.ts";

type AppendStyleToStylesheet = (style: string) => void;
type GetID = () => string;

const optimist = Math.floor(Math.random() * 256).toString(16);

const getID: GetID = () => {
  const stub = stylesheet?.cssRules.length.toString(16);
  const uniqueID = `${optimist}_${stylesheetIndex}_${stub}`;

  return uniqueID;
};

const getTemplateAsStr: GetTemplate = (templateArray, injections) => {
  const requestedStyle = [];

  // injections length?
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
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `.${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const keyframe: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `@keyframes ${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const getSelector: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `.${id}:${selector} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const getAttribute: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `.${getID()}[${selector}] {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const getMediaQuery: GetMediaQuery = ({
  mediaQuery,
  selector,
  templateArray,
  injections,
}) => {
  const id = getID();
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

const createSelector: CreateSelectorTemplate = (selector) => {
  return (templateArray, ...injections) =>
    getSelector({
      selector,
      templateArray,
      injections,
    });
};

const createAttributeSelector: CreateSelectorTemplate = (selector) => {
  return (templateArray, ...injections) =>
    getAttribute({
      selector,
      templateArray,
      injections,
    });
};

const createMediaQuery: CreateQueryTemplate = (mediaQuery, selector) => {
  return (templateArray, ...injections) =>
    getMediaQuery({
      mediaQuery,
      selector,
      templateArray,
      injections,
    });
};

export { keyframe, style, createAttributeSelector, createSelector, createMediaQuery };
