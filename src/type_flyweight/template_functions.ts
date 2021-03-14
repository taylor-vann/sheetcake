// brian taylor vann
// template functions

import { InjectionValue } from "./style_fixture.ts";

type GetTemplateAsString = (
  templateArray: TemplateStringsArray,
  injections: InjectionValue[]
) => string;

interface StyleTemplateParams {
  templateArray: TemplateStringsArray;
  injections: InjectionValue[];
  prefix: string;
}
type AppendStyleTemplate = (params: StyleTemplateParams) => string;

interface SelectorTemplateParams {
  fragment: string;
  cssSelector: string;
  prefix: string;
}
type AppendSelectorTemplate = (params: SelectorTemplateParams) => string;

interface MediaQueryTemplateParams {
  fragment: string;
  query: string;
  prefix: string;
}
type AppendMediaQueryTemplate = (params: MediaQueryTemplateParams) => string;

type StyleRecord = Record<string, string>;
type GetUniqueID = (prefix: string) => string;
type AppendStyleToStylesheet = (style: string) => void;

export type {
  AppendMediaQueryTemplate,
  AppendSelectorTemplate,
  AppendStyleTemplate,
  AppendStyleToStylesheet,
  GetTemplateAsString,
  GetUniqueID,
  MediaQueryTemplateParams,
  SelectorTemplateParams,
  StyleRecord,
  StyleTemplateParams,
};
