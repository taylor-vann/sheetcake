// brian taylor vann
// template functions

import type {
  GetTemplate,
  GetSelector,
  GetMediaQuery,
  StyleTemplate,
  CreateSelectorTemplate,
  CreateQueryTemplate,
  AppendStyleToStylesheet,
  GetID,
} from "../type_flyweight/template_functions.ts";

import { stylesheet, stylesheetIndex } from "../sheet/sheet.ts";

const optimist = Math.floor(Math.random() * 256).toString(16);

const getID: GetID = () => {
  const stub = stylesheet?.cssRules.length.toString(16);
  const uniqueID = `${optimist}_${stylesheetIndex}_${stub}`;

  return uniqueID;
};

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
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `._${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const keyframe: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `@keyframes _${id} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const getSelector: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `._${id}:${selector} {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const getAttributeSelector: GetSelector = ({
  selector,
  templateArray,
  injections,
}) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `._${getID()}[${selector}] {${template}}`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const getMediaQuery: GetMediaQuery = ({
  mediaQuery,
  templateArray,
  injections,
}) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const constructedStyle = `@media ${mediaQuery} {
    ._${id} {${template}}
  }`;

  appendStyleToStylesheet(constructedStyle);

  return id;
};

const createSelector: CreateSelectorTemplate = (selector) => {
  return (templateArray, ...injections) =>
    getSelector({
      injections,
      selector,
      templateArray,
    });
};

const createAttributeSelector: CreateSelectorTemplate = (selector) => {
  return (templateArray, ...injections) =>
    getAttributeSelector({
      injections,
      selector,
      templateArray,
    });
};

const createMediaQuery: CreateQueryTemplate = (mediaQuery) => {
  return (templateArray, ...injections) =>
    getMediaQuery({
      injections,
      mediaQuery,
      templateArray,
    });
};

export {
  appendStyleToStylesheet,
  createAttributeSelector,
  createMediaQuery,
  createSelector,
  getID,
  getTemplateAsStr,
  keyframe,
  optimist,
  style,
};
