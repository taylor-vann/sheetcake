// brian taylor vann
// sheet

import type {
  AppendStyle,
  ConstructStylesheet,
  GetFocusedStyle,
  GetRecord,
  GetStub,
  GetStylesheet,
  GetStyleText,
  QueueStylesheet,
  StyleRecord,
} from "../type_flyweight/sheet.ts";

let focusedStyle: string;
let stub = -1;
const styleReocrd: StyleRecord = {};

const getStub: GetStub = () => {
  stub += 1;
  return stub;
};

const getStyleRecord: GetRecord = () => styleReocrd;
const getFocusedStyle: GetFocusedStyle = () => focusedStyle;

const constructStylesheet: ConstructStylesheet = () => {
  // TODO: when constructable stylesheets lands, no longer necessary.
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(""));
  document.head.appendChild(style);

  if (style.sheet !== null) {
    return style.sheet;
  }
};

const queueStylesheet: QueueStylesheet = (name) => {
  focusedStyle = name;

  let stylesheet = styleReocrd[name]?.stylesheet;
  if (stylesheet) {
    return stylesheet;
  }

  stylesheet = constructStylesheet();
  styleReocrd[name] = { stylesheet, rules: [] };

  return stylesheet;
};

const getStylesheet: GetStylesheet = () => {
  return styleReocrd[focusedStyle]?.stylesheet;
};

const getStylesheetText: GetStyleText = () => {
  const styleRules = styleReocrd[focusedStyle];
  if (styleRules === undefined) {
    return;
  }

  return styleRules.rules.join("\n");
};

const appendStyle: AppendStyle = (style) => {
  const styleChunk = styleReocrd[focusedStyle];
  if (styleChunk === undefined) {
    return;
  }

  const { stylesheet, rules } = styleChunk;

  stylesheet?.insertRule(style, rules.length);
  rules.push(style);
};

export {
  appendStyle,
  getFocusedStyle,
  getStub,
  getStyleRecord,
  getStylesheet,
  getStylesheetText,
  queueStylesheet,
};
