import { stylesheet } from "../sheet/sheet.ts";

import {
  appendStyleToStylesheet,
  createAttributeSelector,
  createMediaQuery,
  createSelector,
  getID,
  getTemplateAsStr,
  keyframe,
  optimist,
  style,
} from "./template_functions.ts";

type GetTemplate = (
  templateArray: TemplateStringsArray,
  ...injections: string[]
) => TemplateStringsArray;

const title = "sheetcake:template_functions";
const runTestsAsynchronously = true;

const getTemplateArray: GetTemplate = (templateArray) => templateArray;

const optimistIsOptimistic = () => {
  const assertions = [];

  if (optimist.length < 2) {
    assertions.push("optimist should have a length of 2");
  }

  return assertions;
};

const testGetId = () => {
  const assertions = [];
  const id = getID();
  const idSplit = id.split("_");

  if (idSplit.length !== 3) {
    assertions.push(
      "getID should return a three part ID separated by '_' an underscore.",
    );
  }

  return assertions;
};

const testAppendStyleToStylesheet = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  appendStyleToStylesheet(`
    .hello_world {
      color: blue;
    }
  `);

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testStyle = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  style`
    color: blue;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testKeyframe = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
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

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  const hover = createSelector("hover");
  hover`
    color: blue;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testCreateMediaQuery = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  const screen600 = createMediaQuery("screen and (min-width: 600px)");
  screen600`
    color: blue;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testCreateAttributeSelector = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  const inputText = createAttributeSelector(`input="text"`);
  inputText`
    color: blue;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const tests = [
  optimistIsOptimistic,
  testGetId,
  testAppendStyleToStylesheet,
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
