// brian taylor vann
// template functions

import type {
  CreateQueryTemplate,
  CreateSelectorTemplate,
  GetID,
  GetMediaQuery,
  GetSelector,
  GetTemplate,
  StyleTemplate,
} from "../type_flyweight/template_functions.ts";

import {
  appendStyleToStylesheet,
  stylesheet,
  stylesheetIndex,
} from "../sheet/sheet.ts";

let prefix = "";
const optimist = Math.floor(Math.random() * 2056).toString(16);

const setPrefix = (updatedPrefix: string) => {
  prefix = updatedPrefix;
};

const getID: GetID = () => {
  const stub = stylesheet?.cssRules.length.toString(16);
  const uniqueID = `${prefix}${optimist}_${stylesheetIndex}_${stub}`;

  return uniqueID;
};

const getTemplateAsStr: GetTemplate = (templateArray, injections) => {
  const styleIntegrals = [];
  const templateLength = templateArray.length;

  let index = 0;
  while (index < templateLength) {
    const templatePiece = templateArray[index];
    const injection = injections[index];

    styleIntegrals.push(templatePiece);
    styleIntegrals.push(injection);

    index += 1;
  }

  const templatePiece = templateArray[index];
  styleIntegrals.push(templatePiece);

  return styleIntegrals.join("");
};

const style: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `._${id} {${template}}`;

  appendStyleToStylesheet(builtStyle);

  return id;
};

const keyframe: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@keyframes _${id} {${template}}`;

  appendStyleToStylesheet(builtStyle);

  return id;
};

const getSelector: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `._${id}:${selector} {${template}}`;

  appendStyleToStylesheet(builtStyle);

  return id;
};

const getAttributeSelector: GetSelector = ({
  selector,
  templateArray,
  injections,
}) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `._${getID()}[${selector}] {${template}}`;

  appendStyleToStylesheet(builtStyle);

  return id;
};

const getMediaQuery: GetMediaQuery = ({
  mediaQuery,
  templateArray,
  injections,
}) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@media ${mediaQuery} {
    ._${id} {${template}}
  }`;

  appendStyleToStylesheet(builtStyle);

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
  setPrefix,
  style,
};
