// brian taylor vann
// sheet

import type {
  GetStylesheetElement,
  GetStylesheet,
  GetSheetIndex,
} from "../type_flyweight/sheet.ts";

const getStylesheetElement: GetStylesheetElement = () => {
  const stylesheetElement = document.createElement("style");
  document.head.appendChild(stylesheetElement);

  return stylesheetElement;
};

const getStylesheet: GetStylesheet = (element) => {
  if (element !== undefined && element.sheet) {
    return element.sheet;
  }
};

const getSheetIndex: GetSheetIndex = (stylesheetElement) => {
  let stylesheetIndex = -1;
  if (stylesheetElement === undefined) {
    return stylesheetIndex;
  }

  const children = document.head.children;
  while (stylesheetIndex < children.length) {
    stylesheetIndex += 1;
    if (children[stylesheetIndex] === stylesheetElement) {
      break;
    }
  }

  return stylesheetIndex;
};

const stylesheetElement = getStylesheetElement();
const stylesheet = getStylesheet(stylesheetElement);
const stylesheetIndex = getSheetIndex(stylesheetElement);

export {
  getStylesheetElement,
  getStylesheet,
  getSheetIndex,
  stylesheetIndex,
  stylesheet,
};
