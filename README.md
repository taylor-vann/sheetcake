# SheetCake

Create CSS when you need it in TS / JS. 

## Abstract

Sheetcake attempts to lasso CSS scoping.

It uses (hopefully) unique keys in lieu of CSS classnames in an effort to limit the affect of cascading in the DOM.

## Why?

CSS is not deterministic and cannot offer a "uniqueness" of any kind.

The relationship where children inherit their parent's style is a little more direct and honest in a single document structure: the DOM.

However, CSS fundamentally splits parent-child relationships across multiple remote sources.

Other stylesheets and the order in which those files are retrieved will effect the final value of every single declaration across every other stylesheet.

In no way can you garauntee that css declarations written in one file will not be overriden by another file downstream.

## License

BSD 2-Clause “Simplified” License