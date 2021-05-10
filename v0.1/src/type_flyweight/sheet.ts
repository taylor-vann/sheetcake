// brian taylor vann
// sheets types

type AppendStyleToStylesheet = (style: string) => void;
type GetStylesheetElement = () => HTMLStyleElement | undefined;
type GetStylesheet = (element?: HTMLStyleElement) => CSSStyleSheet | undefined;
type GetSheetIndex = (stylesheet?: HTMLStyleElement) => number;

export type {
  AppendStyleToStylesheet,
  GetSheetIndex,
  GetStylesheet,
  GetStylesheetElement,
};
