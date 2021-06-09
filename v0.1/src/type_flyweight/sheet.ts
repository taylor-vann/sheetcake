// brian taylor vann
// sheets types

type AddStyles = (sheet: CSSStyleSheet, rules: string[]) => void;
type AppendStyle = (id: string, style: string) => void;
type ConstructStyleSheet = () => CSSStyleSheet | undefined;
type CreateCSSStyleSheet = (styleNames: string[]) => CSSStyleSheet | undefined;
type CreateStylesAsText = (styleNames: string[]) => string | undefined;
type GetRecord = () => StyleRecord;
type GetStub = () => number;
type StyleRecord = Record<string, string>;

export type {
  AddStyles,
  AppendStyle,
  ConstructStyleSheet,
  CreateCSSStyleSheet,
  CreateStylesAsText,
  GetRecord,
  GetStub,
  StyleRecord,
};
