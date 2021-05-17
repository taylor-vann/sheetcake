import { appendStyle, queueStylesheet } from "./sheet.ts";

const title = "sheetcake:sheet";
const runTestsAsynchronously = true;

const stylesheetExists = () => {
  const assertions = [];

  const stylesheet = queueStylesheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should be refined.");
  }
};

const getStylesheetInstance = () => {
  const assertions = [];

  const stylesheet = queueStylesheet("test");
  if (!(stylesheet instanceof CSSStyleSheet)) {
    assertions.push("stylesheet should be an instance of CSSStyleSheet");
  }
};

const testAppendStyle = () => {
  const assertions = [];

  const stylesheet = queueStylesheet("test");
  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;

  appendStyle(`
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
  getStylesheetInstance,
  testAppendStyle,
];

const unitTestSheet = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestSheet };
