// brian taylor vann
// style fixture

import type { GetInterface } from "../type_flyweight/style_fixture.ts";

import {
  style,
  keyframe,
  mediaQuery,
  selector,
} from "../template_functions/template_functions.ts";

const createInterface: GetInterface = (prefix) => {
  return {
    style: (templateArray, ...injections) => {
      // insert rule
      return style({
        injections,
        prefix,
        templateArray,
      });
    },
    keyframe: (templateArray, ...injections) => {
      // pass stylesheet
      return keyframe({
        injections,
        prefix,
        templateArray,
      });
    },
    mediaQuery: (query: string, fragment: string) => {
      return mediaQuery({ fragment, prefix, query });
    },
    selector: (cssSelector, fragment) => {
      return selector({
        cssSelector,
        fragment,
        prefix,
      });
    },
  };
}

export { createInterface };
