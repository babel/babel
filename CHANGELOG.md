# Changelog

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Spec Compliancy]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]

_Note: Gaps between patch versions are faulty/broken releases._

See [CHANGELOG - 6to5](CHANGELOG-6to5.md) for the pre-4.0.0 version changelog.

## 5.1.13

 * **Polish**
  * Remove symbol check from `defineProperty` helper.

## 5.1.12

 * **Bug Fix**
  * Fix `resolveModuleSource` not being ran on `ExportAllDeclaration`s.
  * Fix `.babelrc` being resolved multiple times when using the require hook.
  * Fix parse error on spread properties in assignment position.
  * Fix `externalHelpers` option being incorrectly listed as type `string`.
 * **Internal**
  * Upgrade `core-js` to `0.9.0`.
 * **Spec Compliancy**
  * Fix object decorators not using the `initializer` pattern.
  * Remove property initializer descriptor reflection.

## 5.1.11

 * **Bug Fix**
  * Memoise and bind member expression decorators.
  * Move JSX children cleaning to opening element visitor. Fixes elements not being cleaned in certain scenarios.
  * Consider `SwitchStatement`s to be `Scopable`.
  * Fix `bluebirdCoroutines` calling `interopRequireWildcard` before it's defined.
  * Add space to `do...while` code generation.
  * Validate `super` use before `this` on `super` exit rather than entrance.
 * **Polish**
  * Add Babel name to logger.

## 5.1.10

 * **Bug Fix**
  * Remove `makePredicate` from acorn in favor of an `indexOf`.
  * Remove statements to expression explosion when inserting a block statement.
 * **Internal**
  * Remove runtime compatibility check.

## 5.1.9

 * **Bug Fix**
  * Fix class property initializers with `undefined` values not being correctly writable.
  * Fix self inferring generators incorrectly causing a stack error.
  * Fix default export specifiers not triggering AMD `module` argument inclusion.
  * Fix assignments not having their module references properly remapped.
 * **Internal**
  * Upgrade to latest `acorn`.
 * **Polish**
  * Make invalid LHS pattern error messages nicer.

## 5.1.8

 * **Bug Fix**
  * Only make parenthesized object pattern LHS illegal.

## 5.1.7

 * **Internal**
  * Add `parse` node API.

## 5.1.6

 * **Bug Fix**
  * Fix `runtime` built-in catchall not properly checking for local variables.

## 5.1.5

 * **Internal**
  * Bump `core-js` version.

## 5.1.4

 * **Polish**
  * Add missing `Reflect` methods to runtime transformer.

## 5.1.3

 * **Internal**
  * Switch entirely to vanilla regenerator.
  * Clean up and make the parsing of decorators stateless.
 * **Bug Fix**
  * Don't do TCO on generators and async functions.
  * Add missing `core-js` runtime definitions.

## 5.1.2

 * **Bug Fix**
  * Add `getIterator` and `isIterable` to `babel-runtime` build script.

## 5.1.1

 * **Bug Fix**
  * Add missing runtime symbol definitions.

## 5.1.0

 * **Bug Fix**
  * Fix super reference when using decorators.
  * Don't do array unpack optimisation when member expressions are present.
  * Add missing descriptors for undecorated class properties.
  * Don't consider `arguments` and `eval` valid function names when doing function name inferrence.
  * Fix scope tracking of constants in loop heads.
  * Parse `AwaitExpression` as a unary instead of an assignment.
  * Fix regex evaluation when attempting static evaluation.
  * Don't emit tokens when doing a lookahead.
  * Add missing `test` declaration to `utility.deadCodeElimination` transformer.
 * **Internal**
  * Upgrade `regenerator` to the latest and use my branch with the hope of eventually switching to vanilla regenerator.
  * Add support for the replacement of for loop `init`s with statements.
  * Upgrade dependencies.
 * **Polish**
  * When adding the scope IIFE when using default parameters, don't shadow the function expression, just `apply` `this` and `arguments` if necessary.
  * Use path basename as non-default import fallback.
 * **New Feature**
  * Add [trailing function comma proposal](https://github.com/jeffmo/es-trailing-function-commas). Thanks [@AluisioASG](https://github.com/AluisioASG)!
  * Add support for object literal decorators.
  * Make core-js modular when using the `runtime` transformer.

## 5.0.12

 * **Bug Fix**
  * Fix incorrect remapping of module references inside of a function id redirection container.

## 5.0.11

 * **Bug Fix**
  * Fix new `for...of` loops not properly inheriting their original loop.
 * **Internal**
  * Disable scope instance cache.
 * **Polish**
  * Allow comments in `.babelrc` JSON.

## 5.0.9

 * **Polish**
  * Use `moduleId` for UMD global name if available.
 * **Bug Fix**
  * Fix UMD global `module` variable shadowing the `amd`/`common` `module` variable.
  * Fix Flow param type annotation regression.
  * Fix function name collision `toString` wrapper. Thanks [@alawatthe](https://github.com/alawatthe)!

## 5.0.8

 * **Bug Fix**
  * Fix falsy static class properties not being writable.
  * Fix block scoping collisions not properly detecting modules and function clashes.
  * Skip `this` before `super` for derived constructors on functions.

## 5.0.7

 * **New Feature**
  * Add `--ignore` and `--only` support to the CLI.
 * **Bug Fix**
  * Remove `HOMEPATH` environment variable from home resolution in `babel/register` cache.
 * **Internal**
  * Disable WIP path resolution introducing infinite recursion in some code examples.
 * **Polish**
  * Add live binding to CommonJS default imports.

## 5.0.6

 * **Bug Fix**
  * Fix mangling of import references that collide with properties on `Object.prototype`.
  * Fix duplicate declarations incorrectly being reported for `var`.

## 5.0.5

 * **Internal**
  * Upgrade `core-js`.
 * **Bug Fix**
  * Fix arrays not being supported in `util.list`.

## 5.0.4

 * **Polish**
  * Check for top level `breakConfig` in `resolveRc`.

## 5.0.3

 * **Bug Fix**
  * Make relative location absolute before calling `resolveRc`.
 * **Internal**
  * Switch to global UID registry.
  * Add `breakConfig` option to prevent Babel from erroring when hitting that option.

## 5.0.1

 * **Bug Fix**
  * Fix duplicate declaration regression.
  * Fix not being able to call non-writable methods.

## 5.0.0

 * **New Feature**
  * Decorators based on [@wycat's](https://github.com/wycats) [stage 1 proposal](https://github.com/wycats/javascript-decorators).
  * Class property initializers based on [@jeffmo's](https://github.com/jeffmo) [stage 0 proposal](https://gist.github.com/jeffmo/054df782c05639da2adb).
  * Export extensions based on [@leebyron's](https://github.com/leebyron) [stage 1 proposal](https://github.com/leebyron/ecmascript-more-export-from).
  * UMD module formatter now supports globals.
  * Add `es3.runtime`, `optimisation.react.inlineElements` and `optimisation.react.constantElements` transformers.
  * Add stage option that replaces the experimental one.
  * Allow ES7 transformer to be enabled via `optional` instead of only via `stage`.
  * Infer string quotes to use in the code generator.
  * Consider `export { foo as default  };` to be the same as `export default foo;`.
  * Add `nonStandard` option that can be set to `false` to remove parser support for JSX and Flow.
  * Add `jsxPragma` option.
  * Automatically generate CLI options based on internal API options.
  * Add support for `.babelrc` on absolute paths.
  * Plugin API!
 * **Internal**
  * Export `options` in browser API.
  * Rewritten parser.
  * Don't block hoist when runtime transformer is enabled in system module formatter.
  * Rewritten the internal traversal and node replacement API to use "paths" that abstracts out node relationships.
 * **Polish**
  * JSX output is now more inline with the official JSX transformer.
  * Hoist block scoping IIFE - this improves memory usage and performance.
  * Better IIFE detection - references are now checked to see if they're referencing the binding we're searching for.
  * Check for import reassignments in constants transformer.
  * Make method definitions with expression bodies illegal.
  * Save register cache on tick instead of `SIGINT`.
  * Enable strict mode on babel-node eval flag.
 * **Bug Fixes**
  * Add support for live bindings. This change also increases the reliablity of export specifier renaming.
  * Add support for super update and non equals assignment expressions.
  * Rename shadow constructor binding in classes.
  * Seed next iteration bindings with previous fresh bindings when reassinging loop block scoped variables.
  * Fix new expression spread referencing the wrong constructor.
  * Call `resolveModuleSource` on dynamic imports.
  * Added `param` to list of duplicate declaration kinds.
 * **Breaking Changes**
  * The Babel playground has been removed.
  * ES7 Abstract References have been removed.
  * Experimental option has been removed in favor of a stage option.
  * Rename `returnUsedHelpers` to `metadataUsedHelpers`.

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
