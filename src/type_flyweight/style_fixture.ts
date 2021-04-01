// brian taylor vann
// style fixture types

type InjectionValue = number | string;

type StyleTemplate = (
  templateArray: TemplateStringsArray,
  ...injections: InjectionValue[]
) => string;


type AppendStyleToStylesheet = (style: string) => void;
type GetID = (prefix: number | string) => string;

export type {
  AppendStyleToStylesheet,
  GetID,
  InjectionValue,
  StyleTemplate,
};
