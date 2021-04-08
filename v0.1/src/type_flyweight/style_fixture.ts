// brian taylor vann
// style fixture types

type InjectionValue = number | string;

type StyleTemplate = (
  templateArray: TemplateStringsArray,
  ...injections: InjectionValue[]
) => string;

type CreateSelectorTemplate = (selector: string) => StyleTemplate;
type CreateQueryTemplate = (query: string, selector?: string) => StyleTemplate;
type AppendStyleToStylesheet = (style: string) => void;

export type {
  AppendStyleToStylesheet,
  CreateQueryTemplate,
  CreateSelectorTemplate,
  InjectionValue,
  StyleTemplate,
};
