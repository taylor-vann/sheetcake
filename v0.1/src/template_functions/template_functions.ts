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

import { appendStyle, getFocusedStyle, getStub } from "../sheet/sheet.ts";

let prefix = "";
const createOptimist = () => Math.floor(Math.random() * 4096).toString(16);
const optimistA = createOptimist();
const optimistB = createOptimist();

const setPrefix = (updatedPrefix: string) => {
  prefix = updatedPrefix;
};

const getID: GetID = () => {
  const stylesheetName = getFocusedStyle();
  const stub = getStub().toString(16);
  const uniqueID =
    `_${prefix}${stylesheetName}_${stub}_${optimistA}_${optimistB}`;

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
  const builtStyle = `.${id} {${template}}`;

  appendStyle(builtStyle);

  return id;
};

const keyframe: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@keyframes _${id} {${template}}`;

  appendStyle(builtStyle);

  return id;
};

const getSelector: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${id}:${selector} {${template}}`;

  appendStyle(builtStyle);

  return id;
};

const getAttributeSelector: GetSelector = ({
  selector,
  templateArray,
  injections,
}) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${getID()}[${selector}] {${template}}`;

  appendStyle(builtStyle);

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
    .${id} {${template}}
  }`;

  appendStyle(builtStyle);

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
  appendStyle,
  createAttributeSelector,
  createMediaQuery,
  createSelector,
  getID,
  getTemplateAsStr,
  keyframe,
  setPrefix,
  style,
};
