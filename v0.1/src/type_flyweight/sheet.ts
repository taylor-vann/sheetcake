// brian taylor vann
// sheets types

interface StyleRecordChunk {
  styleSheet: CSSStyleSheet;
  rules: string[];
}
type StyleRecord = Record<string, StyleRecordChunk>;

type AppendStyle = (style: string) => void;
type GetRecord = () => StyleRecord;
type GetFocusedStyle = () => string;
type ConstructStyleSheet = () => CSSStyleSheet | undefined;
type GetStyleSheet = (name: string) => CSSStyleSheet | undefined;
type GetStyleText = (name: string) => string | undefined;
type QueueStyleSheet = GetStyleSheet;
type GetStub = () => number;
type AddStyles = (sheet: CSSStyleSheet, rules: string[]) => void;

export type {
  AddStyles,
  AppendStyle,
  ConstructStyleSheet,
  GetFocusedStyle,
  GetRecord,
  GetStub,
  GetStyleSheet,
  GetStyleText,
  QueueStyleSheet,
  StyleRecord,
};
