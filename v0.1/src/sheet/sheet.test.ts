import { appendStyle, getStyleRecord } from "./sheet.ts";

const title = "sheetcake:sheet";
const runTestsAsynchronously = true;

const testAppendStyle = () => {
  const assertions = [];

  let styles = getStyleRecord();
  const styleLength = Object.entries(styles).length;
  appendStyle(
    "example",
    `
    .hello_world {
      color: blue;
    }
  `,
  );

  styles = getStyleRecord();
  const updatedStyleLength = Object.entries(styles).length;

  if (styleLength + 1 !== updatedStyleLength) {
    assertions.push("styleSheet length should have increased by 1.");
  }

  return assertions;
};

const tests = [
  testAppendStyle,
];

const unitTestSheet = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestSheet };
