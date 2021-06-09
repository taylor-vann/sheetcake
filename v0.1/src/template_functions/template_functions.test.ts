import { getStyleRecord } from "../sheet/sheet.ts";
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

  let styles = getStyleRecord();
  const styleCount = Object.entries(styles).length;
  style`
    color: blue;
  `;

  styles = getStyleRecord();
  const updatedStyleCount = Object.entries(styles).length;
  if (styleCount + 1 !== updatedStyleCount) {
    assertions.push("color should be blue.");
  }

  return assertions;
};

const testKeyframe = () => {
  const assertions = [];

  let styles = getStyleRecord();
  const styleCount = Object.entries(styles).length;
  keyframe`
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
  `;

  styles = getStyleRecord();
  const updatedStyleCount = Object.entries(styles).length;
  if (styleCount + 1 !== updatedStyleCount) {
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

  let styles = getStyleRecord();
  const styleCount = Object.entries(styles).length;

  const hover = createSelector("hover");
  hover`
    color: yellow;
  `;

  styles = getStyleRecord();
  const updatedStyleCount = Object.entries(styles).length;
  if (styleCount + 1 !== updatedStyleCount) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testCreateMediaQuery = () => {
  const assertions = [];

  let styles = getStyleRecord();
  const styleCount = Object.entries(styles).length;

  const screen600 = createMediaQuery("screen and (min-width: 600px)");
  screen600`
    color: green;
  `;

  styles = getStyleRecord();
  const updatedStyleCount = Object.entries(styles).length;
  if (styleCount + 1 !== updatedStyleCount) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testCreateAttributeSelector = () => {
  const assertions = [];

  let styles = getStyleRecord();
  const styleCount = Object.entries(styles).length;

  const inputText = createAttributeSelector(`input="text"`);
  inputText`
    color: purple;
  `;

  styles = getStyleRecord();
  const updatedStyleCount = Object.entries(styles).length;
  if (styleCount + 1 !== updatedStyleCount) {
    assertions.push("stylesheet length should have increased by 1.");
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
