// brian taylor vann
// sheet

import type {
  AppendStyle,
  ConstructStyleSheet,
  GetFocusedStyle,
  GetRecord,
  GetStub,
  GetStyleSheet,
  GetStyleText,
  QueueStyleSheet,
  StyleRecord,
} from "../type_flyweight/sheet.ts";

let focusedStyle: string;
let stub = -1;
const styleRecord: StyleRecord = {};

const getStub: GetStub = () => {
  stub += 1;
  return stub;
};

const getStyleRecord: GetRecord = () => styleRecord;
const getFocusedStyle: GetFocusedStyle = () => focusedStyle;

const constructStyleSheet: ConstructStyleSheet = () => {
  // TODO: when constructable styleSheets lands, no longer necessary.
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);

  if (style.sheet !== null) {
    return style.sheet;
  }
};

const queueStyleSheet: QueueStyleSheet = (name) => {
  focusedStyle = name;

  let styleSheet: CSSStyleSheet | undefined = styleRecord[name]?.styleSheet;
  if (styleSheet !== undefined) {
    return styleSheet;
  }

  styleSheet = constructStyleSheet();
  if (styleSheet === undefined) {
    return;
  }

  styleRecord[name] = { styleSheet, rules: [] };

  return styleSheet;
};

const getStyleSheet: GetStyleSheet = (name) => {
  return styleRecord[name]?.styleSheet;
};

const getStyleSheetText: GetStyleText = (name) => {
  const styleChunk = styleRecord[name];
  if (styleChunk === undefined) {
    return;
  }

  return styleChunk.rules.join("\n");
};

const appendStyle: AppendStyle = (style) => {
  const styleChunk = styleRecord[focusedStyle];

  if (styleChunk === undefined) {
    return;
  }

  const { styleSheet, rules } = styleChunk;

  styleSheet.insertRule(style, rules.length);
  rules.push(style);
};

export {
  appendStyle,
  getFocusedStyle,
  getStub,
  getStyleRecord,
  getStyleSheet,
  getStyleSheetText,
  queueStyleSheet,
};
