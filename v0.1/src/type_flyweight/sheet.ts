// brian taylor vann
// sheets types

type GetStylesheetElement = () => HTMLStyleElement | undefined;
type GetStylesheet = (element?: HTMLStyleElement) => CSSStyleSheet | undefined;
type GetSheetIndex = (stylesheet?: HTMLStyleElement) => number;

export type { GetStylesheetElement, GetStylesheet, GetSheetIndex };
