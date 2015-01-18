# Notes

 * Wildcard exports/imports wont normalise if `export default` is a non-object. See [#224](https://github.com/6to5/6to5/issues/224).

## 3.0.0 breaking changes

 * Remove `allowImportExportEverywhere` option from acorn.
 * Remove this shorthand from playground.
 * Remove `super()` inside non-constructors - add descriptive error message.
 * Split up ES5 getter/setter transforming and ES6 property methods into separate transformers.
 * Add autoindentation.
 * Move `super` transformation from classes into a separate transformer that also supports object expressions.
 * Remove fast transformer backwards compatibility.
 * Rename let scoping transformer to block scoping.
