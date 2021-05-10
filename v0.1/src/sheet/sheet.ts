// brian taylor vann
// sheet

import type {
  AppendStyleToStylesheet,
  GetSheetIndex,
  GetStylesheet,
  GetStylesheetElement,
} from "../type_flyweight/sheet.ts";

const getStylesheetElement: GetStylesheetElement = () => {
  const element = document.createElement("style");
  document.head.appendChild(element);

  return element;
};

const getStylesheet: GetStylesheet = (element) => {
  if (element !== undefined && element.sheet) {
    return element.sheet;
  }
};

const getSheetIndex: GetSheetIndex = (element) => {
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

const appendStyleToStylesheet: AppendStyleToStylesheet = (style) => {
  if (stylesheet !== undefined) {
    stylesheet.insertRule(style, stylesheet.cssRules.length);
  }
};

export {
  appendStyleToStylesheet,
  getSheetIndex,
  getStylesheet,
  getStylesheetElement,
  stylesheet,
  stylesheetIndex,
};