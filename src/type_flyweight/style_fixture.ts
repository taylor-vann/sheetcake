// brian taylor vann
// style fixture types

type InjectionValue = number | string;

type StyleTemplate = (
  templateArray: TemplateStringsArray,
  ...injections: InjectionValue[]
) => string;

type ScopedTemplate = (cssSelector: string, fragment: string) => string;
interface StyleFixtureInterface {
  keyframe: StyleTemplate;
  mediaQuery: ScopedTemplate;
  selector: ScopedTemplate;
  style: StyleTemplate;
}

type GetInterface = (prefix: string) => StyleFixtureInterface | undefined;

type AppendStyleToStylesheet = (style: string) => void;
type GetID = (prefix: string) => string;
type StyleRecord = Record<string, string>;

export type {
  AppendStyleToStylesheet,
  GetID,
  InjectionValue,
  ScopedTemplate,
  GetInterface,
  StyleFixtureInterface,
  StyleRecord,
  StyleTemplate,
};
