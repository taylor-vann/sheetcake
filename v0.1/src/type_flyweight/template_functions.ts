// brian taylor vann
// template functions types

type InjectionValue = number | string;

type StyleTemplate = (
  templateArray: TemplateStringsArray,
  ...injections: InjectionValue[]
) => string;

type CreateSelectorTemplate = (selector: string) => StyleTemplate;
type CreateQueryTemplate = (query: string, selector?: string) => StyleTemplate;
type GetID = () => string;
type AppendStyleToStylesheet = (style: string) => void;

type GetTemplate = (
  templateArray: TemplateStringsArray,
  injections: InjectionValue[],
) => string;

interface GetSelectorParams {
  selector: string;
  templateArray: TemplateStringsArray;
  injections: InjectionValue[];
}
type GetSelector = (params: GetSelectorParams) => string;

interface GetMediaQueryParams {
  mediaQuery: string;
  templateArray: TemplateStringsArray;
  injections: InjectionValue[];
}
type GetMediaQuery = (params: GetMediaQueryParams) => string;

export type {
  AppendStyleToStylesheet,
  CreateQueryTemplate,
  CreateSelectorTemplate,
  GetID,
  GetMediaQuery,
  GetSelector,
  GetTemplate,
  InjectionValue,
  StyleTemplate,
};
