import { appendStyle, queueStyleSheet } from "./sheet.ts";

const title = "sheetcake:sheet";
const runTestsAsynchronously = true;

const styleSheetExists = () => {
  const assertions = [];

  const styleSheet = queueStyleSheet("test");
  if (styleSheet === undefined) {
    assertions.push("styleSheet should be refined.");
  }
};

const getStyleSheetInstance = () => {
  const assertions = [];

  const styleSheet = queueStyleSheet("test");
  if (!(styleSheet instanceof CSSStyleSheet)) {
    assertions.push("styleSheet should be an instance of CSSStyleSheet");
  }
};

const testAppendStyle = () => {
  const assertions = [];

  const styleSheet = queueStyleSheet("test");
  if (styleSheet === undefined) {
    assertions.push("styleSheet should be defined");
    return assertions;
  }

  const styleCount = styleSheet.cssRules.length;

  appendStyle(`
    .hello_world {
      color: blue;
    }
  `);

  if (styleCount + 1 !== styleSheet.cssRules.length) {
    assertions.push("styleSheet length should have increased by 1.");
  }

  return assertions;
};

const tests = [
  styleSheetExists,
  getStyleSheetInstance,
  testAppendStyle,
];

const unitTestSheet = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestSheet };
