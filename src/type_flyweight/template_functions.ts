// brian taylor vann
// template functions

import { InjectionValue } from "./style_fixture.ts";

type GetTemplate = (
  templateArray: TemplateStringsArray,
  injections: InjectionValue[]
) => string;

interface GetSelectorParams {
  selector: string,
  templateArray: TemplateStringsArray,
  injections: InjectionValue[]
}
type GetSelector = (
  params: GetSelectorParams,
) => string;

interface GetMediaQueryParams {
  mediaQuery: string,
  selector?: string,
  templateArray: TemplateStringsArray,
  injections: InjectionValue[]
}
type GetMediaQuery = (
  params: GetMediaQueryParams
) => string;

type AppendStyleToStylesheet = (style: string) => void;

export type {
  AppendStyleToStylesheet,
  GetTemplate,
  GetSelector,
  GetMediaQuery,
};
