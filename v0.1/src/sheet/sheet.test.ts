import {
  appendStyleToStylesheet,
  getSheetIndex,
  getStylesheet,
  getStylesheetElement,
  stylesheet,
  stylesheetIndex,
} from "./sheet.ts";

const title = "sheetcake:sheet";
const runTestsAsynchronously = true;

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

  const stylesheet = getStylesheet(element);
  if (!(stylesheet instanceof CSSStyleSheet)) {
    assertions.push("stylesheet should be an instance of CSSStyleSheet");
  }

  const stylesheetIndex = getSheetIndex(element);
  if (stylesheetIndex === -1) {
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

const tests = [
  stylesheetExists,
  stylesheetIndexExists,
  getStylesheetInstance,
  testAppendStyleToStylesheet,
];

const unitTestSheet = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestSheet };
