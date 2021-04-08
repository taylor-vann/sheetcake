import {
  getStylesheetElement,
  getStylesheet,
  getSheetIndex,
  stylesheetIndex,
  stylesheet,
} from "./sheet.ts";

const title = "sheetcake:sheet";
const runTestsAsynchronously = true;

const tests = [];

const unitTestSheet = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestSheet };
