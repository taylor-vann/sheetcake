import { queueStyleSheet } from "../sheet/sheet.ts";

import {
  createAttributeSelector,
  createMediaQuery,
  createSelector,
  getID,
  getTemplateAsStr,
  keyframe,
  style,
} from "./template_functions.ts";

type GetTemplate = (
  templateArray: TemplateStringsArray,
  ...injections: string[]
) => TemplateStringsArray;

const title = "sheetcake:template_functions";
const runTestsAsynchronously = true;

const getTemplateArray: GetTemplate = (templateArray) => templateArray;

const testGetId = () => {
  const assertions = [];
  const id = getID();
  const idSplit = id.split("_");

  if (idSplit.length !== 5) {
    assertions.push(
      "getID should return a three part ID separated by '_' an underscore.",
    );
  }

  return assertions;
};

const testStyle = () => {
  const assertions = [];

  const stylesheet = queueStyleSheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  style`
    color: blue;
  `;

  const computedStyle = stylesheet.cssRules[styleCount] as CSSStyleRule;
  if (computedStyle === undefined) {
    assertions.push("computed style should not be undefined");
    return assertions;
  }

  if (computedStyle.style.color !== "blue") {
    assertions.push("color should be blue.");
  }

  return assertions;
};

const testKeyframe = () => {
  const assertions = [];

  const stylesheet = queueStyleSheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  keyframe`
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  const computedStyles = stylesheet.cssRules[styleCount] as CSSKeyframesRule;
  if (computedStyles === undefined) {
    assertions.push("computed style should not be undefined");
    return assertions;
  }

  if (computedStyles.cssRules.length !== 3) {
    assertions.push("rule should have three parts");
  }
  if (computedStyles.cssRules[0].cssText !== "0% { opacity: 0; }") {
    assertions.push("first rule should match '0% { opacity: 0; }'");
  }
  if (computedStyles.cssRules[1].cssText !== "50% { opacity: 1; }") {
    assertions.push("second rule should match '50% { opacity: 1; }'");
  }
  if (computedStyles.cssRules[2].cssText !== "100% { opacity: 0; }") {
    assertions.push("third rule should match '100% { opacity: 0; }'");
  }

  return assertions;
};

const testGetTemplateAsStr = () => {
  const assertions = [];
  const expectedString = "hello, honeybear, how are you?";
  const templateArray = getTemplateArray`hello, ${""}, how are you?`;
  const templateStr = getTemplateAsStr(templateArray, ["honeybear"]);

  if (templateStr !== expectedString) {
    assertions.push("templateStr did not match expectedString");
  }

  return assertions;
};

const testCreateSelector = () => {
  const assertions = [];

  const stylesheet = queueStyleSheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  const hover = createSelector("hover");
  hover`
    color: yellow;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  const computedStyle = stylesheet.cssRules[styleCount] as CSSStyleRule;
  if (computedStyle === undefined) {
    assertions.push("computed style should not be undefined");
    return assertions;
  }

  if (computedStyle.style.color !== "yellow") {
    assertions.push("color should be yellow");
  }
  if (!computedStyle.selectorText.endsWith(":hover")) {
    assertions.push("selectorText should end with ':hover'");
  }

  return assertions;
};

const testCreateMediaQuery = () => {
  const assertions = [];

  const stylesheet = queueStyleSheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  const screen600 = createMediaQuery("screen and (min-width: 600px)");
  screen600`
    color: green;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  const computedStyle = stylesheet.cssRules[styleCount] as CSSMediaRule;
  if (computedStyle === undefined) {
    assertions.push("computed style should not be undefined");
    return assertions;
  }

  if (computedStyle.conditionText !== "screen and (min-width: 600px)") {
    assertions.push("condition text should be 'screen and (min-width: 600px)'");
  }

  const firstStyle = computedStyle.cssRules[0] as CSSStyleRule;
  if (firstStyle === undefined || firstStyle.style.color !== "green") {
    assertions.push("condition text should be 'screen and (min-width: 600px)'");
  }

  return assertions;
};

const testCreateAttributeSelector = () => {
  const assertions = [];

  const stylesheet = queueStyleSheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  const inputText = createAttributeSelector(`input="text"`);
  inputText`
    color: purple;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  const computedStyle = stylesheet.cssRules[styleCount] as CSSStyleRule;
  if (computedStyle === undefined) {
    assertions.push("computed style should not be undefined");
    return assertions;
  }

  if (!computedStyle.selectorText.endsWith('[input="text"]')) {
    assertions.push('selectorText should be [input="text"]');
  }
  if (computedStyle.style.color !== "purple") {
    assertions.push("style color should be purple");
  }

  return assertions;
};

const tests = [
  testGetId,
  testStyle,
  testKeyframe,
  testGetTemplateAsStr,
  testCreateSelector,
  testCreateMediaQuery,
  testCreateAttributeSelector,
];

const unitTestTemplateFunctions = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestTemplateFunctions };
