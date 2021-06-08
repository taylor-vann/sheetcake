// brian taylor vann
// sheets types

type AddStyles = (sheet: CSSStyleSheet, rules: string[]) => void;
type AppendStyle = (id: string, style: string) => void;
type ConstructStyleSheet = () => CSSStyleSheet | undefined;
type GetRecord = () => StyleRecord;
type GetStub = () => number;
type GetCSSStyleSheet = (styleNames: string[]) => CSSStyleSheet | undefined;
type GetStylesAsText = (styleNames: string[]) => string | undefined;
type StyleRecord = Record<string, string>;

export type {
  AddStyles,
  AppendStyle,
  ConstructStyleSheet,
  GetRecord,
  GetStub,
  GetCSSStyleSheet,
  GetStylesAsText,
  StyleRecord,
};
