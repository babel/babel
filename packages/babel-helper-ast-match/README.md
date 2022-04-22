# @babel/helper-ast-match

This helper aids in writing easy-to-read code for matching ast fragments against a specified shape or pattern.

## Usage

```js
import astMatch, { matchers } from "@babel/helper-ast-match";

const matching = program.body.find(declaration => {
  return astMatch(declaration, {
    type: "ImportDeclaration",
    source: { value: "source" },
    specifiers: matchers.includes({
      type: "ImportSpecifier",
      imported: { name: "name" },
    }),
  });
});
```

## API

`astMatch(ast, matcher)`

## Matchers

- `{[key]: matcher}` An object used as a matcher matches when every key defined in the matcher object is present in `ast`. `ast` is allowed to contain keys which are unmatched.
- `[...matchers]` An array used as a matcher matches when all of the following conditions are met:
  - `ast` is an array
  - `matchers.length === ast.length`
  - every `matchers` is equivalent by `astMatch(ast[i], matchers[i])`
- `none` is a matcher that matches when `ast` is `undefined`
- `anyOf(...matchers)` returns a matcher that matches when any of its `matchers` match
- `includes(matcher)` returns a matcher that matches when `ast` is an array which includes a value which matches `matcher`
