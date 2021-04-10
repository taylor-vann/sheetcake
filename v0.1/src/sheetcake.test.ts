// brian taylor vann
// sheetcake test

import { unitTestSheet } from "./sheet/sheet.test.ts";
import { unitTestTemplateFunctions } from "./template_functions/template_functions.test.ts";

const tests = [
  unitTestSheet,
  unitTestTemplateFunctions,
];

export { tests };
