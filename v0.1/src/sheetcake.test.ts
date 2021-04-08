// brian taylor vann
// sheetcake test

import { unitTestSheet } from "./sheet/sheet.test.ts";
import { unitTestTemplateFunctions } from "./template_functions/template_functions.test.ts";
import { unitTestCompoundFunctions } from "./compound_templates/compound_templates.test.ts";

const tests = [
  unitTestSheet,
  unitTestTemplateFunctions,
  unitTestCompoundFunctions,
];

export { tests };
