import { stylesheet } from "../sheet/sheet.ts";

import {
  checked,
  disabled,
  focus,
  hover,
  invalid,
  landscape,
  portrait,
  print,
  required,
  screen1008,
  screen641,
  valid,
} from "./compound_templates.ts";

const title = "sheetcake:compound_templates";
const runTestsAsynchronously = true;

const testChecked = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  checked`
	color: green;
  `;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testDisabled = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  disabled`
	color: purple;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testFocus = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  focus`
	color: blue;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testHover = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  hover`
	color: red;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testInvalid = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  invalid`
	color: orange;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testLandscape = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  landscape`
	color: black;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testPortrait = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  portrait`
	color: purple;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testPrint = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  print`
	color: pink;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testRequired = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  required`
	color: green;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testScreen1008 = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  screen1008`
	color: red;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testScreen641 = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  screen641`
	color: orange;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const testValid = () => {
  const assertions = [];

  if (stylesheet === undefined) {
    assertions.push("stylesheet should be defined");
    return assertions;
  }

  const styleCount = stylesheet.cssRules.length;
  valid`
	color: orange;
	`;

  if (styleCount + 1 !== stylesheet.cssRules.length) {
    assertions.push("stylesheet length should have increased by 1.");
  }

  return assertions;
};

const tests = [
  testChecked,
  testDisabled,
  testFocus,
  testHover,
  testInvalid,
  testLandscape,
  testPortrait,
  testPrint,
  testRequired,
  testScreen1008,
  testScreen641,
  testValid,
];

const unitTestCompoundFunctions = {
  title,
  tests,
  runTestsAsynchronously,
};

export { unitTestCompoundFunctions };
