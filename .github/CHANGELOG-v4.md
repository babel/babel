# Babel v4 Changelog

## 4.7.16

 * **Bug Fix**
  * Fix constructor spreading of typed arrays.
  * Fix break/continue/return aliasing of non-loops in block scoping transformer.

## 4.7.15

 * **Bug Fix**
  * Fix constructor spreading of collections.

## 4.7.14

 * **Bug Fix**
  * Fix constructor spreading of `Promise`.
 * **Internal**
  * Deprecate remaining playground transformers and abstract references.

## 4.7.13

 * **Bug Fix**
  * Handle comments on use strict directives.
  * Fix assignment patterns with a left side pattern.
 * **Polish**
  * Special case `this` when doing expression memoisation.

## 4.7.12

 * **Bug Fix**
  * Deprecate `playground.methodBinding`.

## 4.7.11

 * **Bug Fix**
  * Fix unicode regexes stripping their unicode flag before being passed on two `regexpu`.

## 4.7.10

 * **Internal**
  * Deprecate `playground.methodBinding` and `playground.objectGetterMemoization`.
 * **Bug Fix**
  * Fix `inputSourceMap` option. Thanks [@Rich-Harris](https://github.com/Rich-Harris)!

## 4.7.9

 * **Polish**
  * Allow `inputSourceMap` to be set to `false` to skip the source map inference.
  * Infer computed literal property names.
 * **Bug Fix**
  * Fix nested labeled for-ofs.
  * Fix block scoping `break` colliding with the parent switch case.
 * **Internal**
  * Upgrade `acorn-babel`.

## 4.7.8

 * **Bug Fix**
  * Fix computed classes not properly setting symbols.

## 4.7.7

 * **Bug Fix**
  * Fix `types` API exposure.

## 4.7.6

 * **Bug Fix**
  * Fix non-Identifier/Literal computed class methods.
 * **Polish**
  * Add a fallback if `stack` on an error is unconfigurable.
  * Hoist `esModule` module declarations to the top of the file to handle circular dependencies better.

## 4.7.5

 * **Bug Fix**
  * Don't remap` break`s to call the iterator return.
 * **Polish**
  * Use a different helper for computed classes for much nicer output. Also fixes a bug in symbols being non-enumerable so they wouldn't be set on the class.

## 4.7.4

 * **Bug Fix**
  * Rewrite named function expressions in optional async function transformers.
  * Hoist directives.
  * Remove `Number` from the list of valid `runtime` constructors.
 * **Internal**
  * `spec.typeofSymbol` transformer has been renamed to `es6.symbols`.

## 4.7.2

 * **New Feature**
  * `"both"` option for `sourceMap`.
  * Add output types to external helpers. Thanks [@neVERberleRfellerER](https://github.com/neVERberleRfellerER)!
 * **Bug Fix**
  * Fix node duplication sometimes resulting in a recursion error.
  * Ignore `break`s within cases inside `for...of`.
 * **Polish**
  * Split up variable declarations and export declarations to allow easier transformation.

## 4.7.0

 * **Bug Fix**
  * Add `alternate` to list of `STATEMENT_OR_BLOCK` keys.
  * Add support for module specifiers to `t.isReferenced`.
 * **New Feature**
  * Add `inputSourceMap` option.
 * **Polish**
  * Throw an error on different `babel` and `babel-runtime` versions.
  * Replicate module environment for `babel-node` eval.
  * Clean up classes output.
 * **Spec Compliancy**
  * Make it illegal to use a rest parameter on a setter.

## 4.6.6

 * **Bug Fix**
  * Fix incorrect method call in `utility.deadCodeElimination` transformer.
  * Fix `es6.blockScopingTDZ` transformer duplicating binding nodes.

## 4.6.5

 * **Internal**
  * `useStrict` transformer has been renamed to `strict`.

## 4.6.4

 * **Bug Fix**
  * Fix `ForOfStatement` not proplery inheriting labels.
  * When in closure mode in block scoping transformer, properly check for variable shadowing.
 * **New Feature**
  * New `utility.inlineEnvironmentVariables` and `utility.inlineExpression` transformers.

## 4.6.3

 * **Bug Fix**
  * Fix `arguments` being incorrectly aliased in arrow function rest parameter optimisation.
  * Make deoptimisation trigger safer.
 * **New Feature**
  * Flow types are now retained when blacklisting the `flow` transformer.

## 4.6.1

 * **Bug Fix**
  * Fix generators in template directory being transformed.
  * Fix exposure of `util` for plugins.

## 4.6.0

 * **New Feature**
  * Desugar sticky regexes to a new constructor expression so it can be handled by a polyfill.
 * **Spec Compliancy**
  * `for...of` now outputs in a lengthy `try...catch` this is to ensure spec compliancy in regards to iterator returns and abrupt completions. See [google/traceur-compiler#1773](https://github.com/google/traceur-compiler/issues/1773) and [babel/babel/#838](https://github.com/babel/babel/issues/838) for more information.
 * **Polish**
  * Rest parameters that are only refered to via number properties on member expressions are desugared into a direct `arguments` reference. Thanks [@neVERberleRfellerER](https://github.com/neVERberleRfellerER)!
  * `$ babel` no longer exits on syntax errors.
 * **Internal**
  * Upgrade `browserify`.
  * Upgrade `source-map`.
  * Publicly expose more internals.

## 4.5.5

 * **Polish**
  * Delete old extensions when overriding them in `babel/register`.

## 4.5.3

 * **Bug Fix**
  * Fix whitelisting logic for helper build script.

## 4.5.2

 * **New Feature**
  * `returnUsedHelpers` option and add whitelist to `buildHelpers`.
 * **Bug Fix**
  * Fix function arity on self referencing inferred named functions.
 * **Internal**
  * Bump `acorn-babel`.
  * Start converting source to ES6...

## 4.5.1

**Babel now compiles itself!**

![holy shit](http://gifsec.com/wp-content/uploads/GIF/2014/03/OMG-GIF_2.gif)

## 4.5.0

 * **New Feature**
  * Add `.babelrc` support.
 * **Bug Fix**
  * Move use strict directives to the module formatter bodies.
 * **Internal**
  * Make default `bin/babel` behaviour to ignore non-compilable files and add a `--copy-files` flag to revert to the old behaviour.

## 4.4.6

 * **Bug Fix**
  * Fix extending a class expression with no methods/only constructor. Thanks [@neVERberleRfellerER](https://github.com/neVERberleRfellerER)!
  * Allow `MemberExpression` as a valid `left` of `ForOfStatement`.
 * **Polish**
  * Throw an error when people try and transpile code with the `@jsx React.DOM` pragma as it conflicts with the custom jsx constructo method detection.
  * Crawl all comments for `@jsx` pragma.
 * **Internal**
  * Upgrade `chalk`.
  * Upgrade `core-js`.

## 4.4.5

 * **Internal**
  * Remove function self reference optimisation.

## 4.4.4

 * **Bug Fix**
  * Handle inferred function ids to be reassigned and deopt to a slower but working equivalent.
  * Don't unpack array patterns that have more elements than their right hand array expression.
 * **Polish**
  * Improve syntax highlighting in the code frame. Thanks [@lydell](https://github.com/lydell)!
 * **Internal**
  * Upgrade `acorn-babel`.

## 4.4.3

 * **Bug Fix**
  * Fix `for...of` iterator break returns being duplicated.
  * Only call `return` on the iterator if it exists.
 * **Internal**
  * Rename `selfContained` transformer to `runtime`.

## 4.4.2

 * **New Feature**
  * Add `moduleId` option for specifying a custom module id.

## 4.4.0

 * **New Feature**
  * `/*** @jsx NAMESPACE **/` comments are now honored by the `react` transformer.
  * `getModuleName` option.
  * Infer function expression names. Thanks [@RReverser](https://github.com/RReverser)!
 * **Bug Fix**
  * Add proper control flow for tail recursion optimisation.
 * **Internal**
  * Remove useless `format` options and move the `format.compact` option to `format`.
 * **Polish**
  * Newline handling of the code generator has been heavily improved.
  * Code generator now deopts whitespace if the input size is >100KB.

## 4.3.0

 * **Breaking Change**
  * Remove `commonStandard` module formatter and make it the default behaviour of all the strict module formatters.

## 4.2.1

 * **Polish**
  * Add auxiliary comment to let scoping closure flow control.

## 4.2.0

 * **Polish**
  * Use an assignment instead of a define for `__esModule` in loose mode.
 * **Internal**
  * Add error for `eval();` usage and enable strict mode for parsing.

## 4.1.0

 * **New Feature**
  * Add `BABEL_CACHE_PATH` and `BABEL_DISABLE_CACHE` environment variables.
 * **Internal**
  * Replace many internal util functions with modules. Thanks [@sindresorhus](https://github.com/sindresorhus)!

## 4.0.2

 * **Bug Fix**
  * Fix generators not properly propagating their internal declarations.
 * **Polish**
  * Update setter param length error message.
  * Use ranges on dependencies.

## 4.0.0

 * 6to5 is now known as Babel.
 * Global helpers/runtime has now been given the more descriptive name of "external helpers".
