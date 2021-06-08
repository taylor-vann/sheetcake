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

import { appendStyle, getStub } from "../sheet/sheet.ts";

const createOptimist = () => Math.floor(Math.random() * 4096).toString(16);
const optA = createOptimist();
const optB = createOptimist();

let prefix = "";
const setPrefix = (updatedPrefix: string) => {
  prefix = updatedPrefix;
};

const getID: GetID = () => {
  const stub = getStub().toString(16);
  const uniqueID = `_${prefix}_${stub}_${optA}_${optB}`;

  return uniqueID;
};

const getTemplateAsStr: GetTemplate = (templateArray, injections) => {
  const integrals = [];
  const length = templateArray.length;

  let index = 0;
  while (index < length) {
    const chunk = templateArray[index];
    const injection = injections[index];

    integrals.push(chunk);
    integrals.push(injection);

    index += 1;
  }

  const chunk = templateArray[index];
  integrals.push(chunk);

  return integrals.join("");
};

const style: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${id} {${template}}`;

  appendStyle(id, builtStyle);

  return id;
};

const keyframe: StyleTemplate = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@keyframes _${id} {${template}}`;

  appendStyle(id, builtStyle);

  return id;
};

const getSelector: GetSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `.${id}:${selector} {${template}}`;

  appendStyle(id, builtStyle);

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

  appendStyle(id, builtStyle);

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

  appendStyle(id, builtStyle);

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
