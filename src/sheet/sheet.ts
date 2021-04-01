// brian taylor vann
// sheet
type GetStylesheetElement = () => HTMLStyleElement | undefined
type GetStylesheet = (element?: HTMLStyleElement) => CSSStyleSheet | undefined
type GetSheetIndex = (stylesheet?: HTMLStyleElement) => number;

const getStylesheetElement: GetStylesheetElement = () => {
  const stylesheetElement = document.createElement("style");
  document.head.appendChild(stylesheetElement);

  return stylesheetElement;
}

const getStylesheet: GetStylesheet = (element) => {
  return element?.sheet ?? undefined;
}

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

  return stylesheetIndex
}

const stylesheetElement = getStylesheetElement();
const stylesheet = getStylesheet(stylesheetElement);
const stylesheetIndex = getSheetIndex(stylesheetElement);

export { stylesheetIndex, stylesheet}