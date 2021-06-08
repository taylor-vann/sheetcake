// brian taylor vann
// sheet

import type {
  AppendStyle,
  ConstructStyleSheet,
  GetRecord,
  GetStub,
  GetCSSStyleSheet,
  GetStylesAsText,
  StyleRecord,
} from "../type_flyweight/sheet.ts";

const styleRecord: StyleRecord = {};

let stub = -1;
const getStub: GetStub = () => {
  stub += 1;
  return stub;
};

const getStyleRecord: GetRecord = () => ({ ...styleRecord });

const constructStyleSheet: ConstructStyleSheet = () => {
  // TODO: when constructable styleSheets lands, no longer necessary.
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);

  const sheet = style.sheet ?? undefined;
  document.head.removeChild(style);

  return sheet;
};

const getCSSStyleSheet: GetCSSStyleSheet = (names) => {
  const sheet = constructStyleSheet();
  if (sheet === undefined) {
    return;
  }

  for (const name of names) {
    const style = styleRecord[name];
    if (style) {
      sheet.insertRule(style);
    }
  }

  return sheet;
};

const getStylesAsText: GetStylesAsText = (names) => {
  let styles = "";
  for (const name of names) {
    const rule = styleRecord[name];
    if (rule) {
      styles += rule;
    }
  }

  if (styles === "") {
    return;
  }

  return styles;
};

const appendStyle: AppendStyle = (id, style) => {
  styleRecord[id] = style;
};

export {
  appendStyle,
  getStub,
  getStyleRecord,
  getCSSStyleSheet,
  getStylesAsText,
};
