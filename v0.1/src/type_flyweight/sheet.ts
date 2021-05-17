// brian taylor vann
// sheets types

interface StyleRecordChunk {
  stylesheet?: CSSStyleSheet;
  rules: string[];
}
type StyleRecord = Record<string, StyleRecordChunk>;

type AppendStyle = (style: string) => void;
type GetRecord = () => StyleRecord;
type GetFocusedStyle = () => string;
type ConstructStylesheet = () => CSSStyleSheet | undefined;

type GetStylesheet = (name: string) => CSSStyleSheet | undefined;
type GetStyleText = (name: string) => string | undefined;
type QueueStylesheet = GetStylesheet;
type GetStub = () => number;
type AddStyles = (sheet: CSSStyleSheet, rules: string[]) => void;

export type {
  AddStyles,
  AppendStyle,
  ConstructStylesheet,
  GetFocusedStyle,
  GetRecord,
  GetStub,
  GetStylesheet,
  GetStyleText,
  QueueStylesheet,
  StyleRecord,
};
