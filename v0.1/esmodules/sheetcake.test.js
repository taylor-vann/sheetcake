const getStylesheetElement = () => {
  const element = document.createElement("style");
  document.head.appendChild(element);
  return element;
};
const getStylesheet = (element) => {
  if (element !== undefined && element.sheet) {
    return element.sheet;
  }
};
const getSheetIndex = (element) => {
  let sheetIndex = -1;
  if (element !== undefined) {
    const children = document.head.children;
    while (sheetIndex < children.length) {
      sheetIndex += 1;
      if (children[sheetIndex] === element) {
        break;
      }
    }
  }
  return sheetIndex;
};
const stylesheetElement = getStylesheetElement();
const stylesheet = getStylesheet(stylesheetElement);
const stylesheetIndex = getSheetIndex(stylesheetElement);
const appendStyleToStylesheet = (style) => {
  if (stylesheet !== undefined) {
    stylesheet.insertRule(style, stylesheet.cssRules.length);
  }
};
const title = "sheetcake:sheet";
const stylesheetExists = () => {
  const assertions = [];
  if (stylesheet === undefined) {
    assertions.push("stylesheet should be refined.");
  }
};
const stylesheetIndexExists = () => {
  const assertions = [];
  if (stylesheetIndex === -1) {
    assertions.push("stylesheet index be a positive integer.");
  }
};
const getStylesheetInstance = () => {
  const assertions = [];
  const element = getStylesheetElement();
  if (!(element instanceof Element)) {
    assertions.push("stylesheet should be an Element");
  }
  const stylesheet1 = getStylesheet(element);
  if (!(stylesheet1 instanceof CSSStyleSheet)) {
    assertions.push("stylesheet should be an instance of CSSStyleSheet");
  }
  const stylesheetIndex1 = getSheetIndex(element);
  if (stylesheetIndex1 === -1) {
    assertions.push("stylesheet index be a positive integer.");
  }
};
const testAppendStyleToStylesheet = () => {
  const assertions = [];
  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }
  const styleCount = stylesheet.cssRules.length;
  appendStyleToStylesheet(
    `\n    .hello_world {\n      color: blue;\n    }\n  `,
  );
  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }
  return assertions;
};
const tests3 = [
  stylesheetExists,
  stylesheetIndexExists,
  getStylesheetInstance,
  testAppendStyleToStylesheet,
];
const unitTestSheet = {
  title,
  tests: tests3,
  runTestsAsynchronously: true,
};
let prefix = "";
const optimist = Math.floor(Math.random() * 2056).toString(16);
const setPrefix = (updatedPrefix) => {
  prefix = updatedPrefix;
};
const getID = () => {
  const stub = stylesheet?.cssRules.length.toString(16);
  const uniqueID = `${prefix}${optimist}_${stylesheetIndex}_${stub}`;
  return uniqueID;
};
const getTemplateAsStr = (templateArray, injections) => {
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
const style = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `._${id} {${template}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const keyframe = (templateArray, ...injections) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@keyframes _${id} {${template}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const getSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `._${id}:${selector} {${template}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const getAttributeSelector = ({ selector, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `._${getID()}[${selector}] {${template}}`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const getMediaQuery = ({ mediaQuery, templateArray, injections }) => {
  const id = getID();
  const template = getTemplateAsStr(templateArray, injections);
  const builtStyle = `@media ${mediaQuery} {\n    ._${id} {${template}}\n  }`;
  appendStyleToStylesheet(builtStyle);
  return id;
};
const createSelector = (selector) => {
  return (templateArray, ...injections) =>
    getSelector({
      injections,
      selector,
      templateArray,
    });
};
const createAttributeSelector = (selector) => {
  return (templateArray, ...injections) =>
    getAttributeSelector({
      injections,
      selector,
      templateArray,
    });
};
const createMediaQuery = (mediaQuery) => {
  return (templateArray, ...injections) =>
    getMediaQuery({
      injections,
      mediaQuery,
      templateArray,
    });
};
const title1 = "sheetcake:template_functions";
const getTemplateArray = (templateArray) => templateArray;
const optimistIsOptimistic = () => {
  const assertions = [];
  if (optimist.length < 2) {
    assertions.push("optimist should have a length of at least 2");
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
const testStyle = () => {
  const assertions = [];
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }
  const styleCount = stylesheet.cssRules.length;
  style`\n    color: blue;\n  `;
  const computedStyle = stylesheet.cssRules[styleCount];
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
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }
  const styleCount = stylesheet.cssRules.length;
  keyframe
    `\n    0%   { opacity: 0; }\n    50%  { opacity: 1; }\n    100% { opacity: 0; }\n  `;
  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }
  const computedStyles = stylesheet.cssRules[styleCount];
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
  const templateStr = getTemplateAsStr(templateArray, [
    "honeybear",
  ]);
  if (templateStr !== expectedString) {
    assertions.push("templateStr did not match expectedString");
  }
  return assertions;
};
const testCreateSelector = () => {
  const assertions = [];
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }
  const styleCount = stylesheet.cssRules.length;
  const hover = createSelector("hover");
  hover`\n    color: yellow;\n  `;
  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }
  const computedStyle = stylesheet.cssRules[styleCount];
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
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }
  const styleCount = stylesheet.cssRules.length;
  const screen600 = createMediaQuery("screen and (min-width: 600px)");
  screen600`\n    color: green;\n  `;
  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }
  const computedStyle = stylesheet.cssRules[styleCount];
  if (computedStyle === undefined) {
    assertions.push("computed style should not be undefined");
    return assertions;
  }
  if (computedStyle.conditionText !== "screen and (min-width: 600px)") {
    assertions.push("condition text should be 'screen and (min-width: 600px)'");
  }
  const firstStyle = computedStyle.cssRules[0];
  if (firstStyle === undefined || firstStyle.style.color !== "green") {
    assertions.push("condition text should be 'screen and (min-width: 600px)'");
  }
  return assertions;
};
const testCreateAttributeSelector = () => {
  const assertions = [];
  if (stylesheet === undefined) {
    assertions.push("stylesheet should not be undefined");
    return assertions;
  }
  const styleCount = stylesheet.cssRules.length;
  const inputText = createAttributeSelector(`input="text"`);
  inputText`\n    color: purple;\n  `;
  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }
  const computedStyle = stylesheet.cssRules[styleCount];
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
const tests1 = [
  optimistIsOptimistic,
  testGetId,
  testStyle,
  testKeyframe,
  testGetTemplateAsStr,
  testCreateSelector,
  testCreateMediaQuery,
  testCreateAttributeSelector,
];
const unitTestTemplateFunctions = {
  title: title1,
  tests: tests1,
  runTestsAsynchronously: true,
};
const tests2 = [
  unitTestSheet,
  unitTestTemplateFunctions,
];
export { tests2 as tests };