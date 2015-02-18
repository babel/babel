# 6to5 Changelog

## 3.6.6

 * **Internal**
  * Upgrade `core-js`.
 * **Bug Fix**
  * Fix temp variables not being properly pushed inside of `while` loops.
 * **New Feature**
  * Add `auxiliaryComment`/`--auxiliary-comment` option that prepends comments to auxiliary helpers.

## 3.6.5

 * **Internal**
  * Upgrade `core-js`.
 * **Bug Fix**
  * Fix block scoping leaking variables in IIFE mode.
  * Fix tail call transformer exploding on return statements as the consequent of an if statement.
 * **New Feature**
  * Add `validation.react` transformer.

## 3.6.4

 * **New Feature**
  * Add support for flow type casts and module types.

## 3.6.3

 * **Internal**
  * Upgrade `acorn-6to5`.
  * Use `default` property on `6to5-runtime`.

## 3.6.2

 * **Polish**
  * Use better iterator detection in `slicedToArray` helper and add support for it to the `selfContained` transformer.

## 3.6.1

 * **Bug Fix**
  * Multiline JSX string literals are now supported.
  * Fix scope tracking import specifiers incorrectly.
  * Fix templates incorrectly recursing into their replacements.
 * **Internal**
  * Type inferrence now extends to function return types.
  * Upgrade `acorn-6to5`.

## 3.6.0

 * **New Feature**
  * Add playground class property initializers.
 * **Polish**
  * Completely reimplemented scope tracking, can now track types and optimise certain helpers based on it.
  * Extremely fast tail recursion optimisation implementation. Thanks [@RReverser](https://github.com/RReverser)!
 * **Internal**
  * `kexec` has been removed as an optional dependency and must be user installed.
  * Upgrade `regenerator-6to5`.
  * Upgrade `acorn-6to5`.
  * Upgrade `core-js`.

## 3.5.3

 * Enable `es6.tailCall` transformer with the first implementation that only works with self referencing calls until we can implement nested tail calls elegantly.

## 3.5.2

 * Disable `es6.tailCall` temporairly after reports of it breaking.

## 3.5.1

 * **Polish**
  * Allow tail calls to work across files without the runtime.
 * **Internal**
  * Upgrade `acorn-6to5`.

## 3.5.0

 * **Bug Fix**
  * Destructuring patterns as the left operator in `ForInStatement`/`ForOfStatement`.
 * **Polish**
  * Make default parameter IIFE invocation smarter.
  * Make `__esModule` flag non-enumerable. Thanks [@daliwali](https://github.com/daliwali)!
 * **Internal**
  * More performance improvements.
  * Parsing is now ~30% faster thanks to [marijnh/acorn@7264bc0178e7e6af7cfe02e9e0c6b26ee0e6007f](https://github.com/marijnh/acorn/commit/7264bc0178e7e6af7cfe02e9e0c6b26ee0e6007f).
 * **New Feature**
  * Optional `es6.blockScopingTDZ` is now completely functional and handles all edgecases.
  * `super` in object literals.
  * Tail call optimisation. Thanks [@RReverser](https://github.com/RReverser)!

## 3.4.1

 * **Bug Fix**
  * Fix conflicting `--module-ids` shorthand arg in `$ 6to5`.
  * Add require hook options to cache key.
  * Fix strict module formatter.

## 3.4.0

 * **New Feature**
  * Add `commonStandard` module formatter.
 * **Bug Fix**
  * Fix conflicting `--module-ids` shorthand arg in `$ 6to5`.
 * **Internal**
  * Lots of internal refactoring with scope tracking and traversal.
 * **Polish**
  * Don't return `map` in the API result if `sourceMap` was set to `"inline"`.

## 3.3.12

 * **Bug Fix**
  * Don't override `MemberExpression`s with `core-js` in `selfContained` if a local binding exists.

## 3.3.11

 * **Bug Fix**
  * Fix the require cache.

## 3.3.10

 * **Internal**
  * Restructure transformers so they're only ran if the AST contains nodes that they need to worry about. Improves transpilation speed significantly.
 * **Bug Fix**
  * Fix source maps not tracking end of node locations.
 * **Spec Compliancy**
  * Use static super references as the home object is actually done at definition time.
 * **Polish**
  * Force the `es6.destructuring` transformer to be whitelisted when the `es7.objectSpread` transformer is.
  * Join sibling string literals when creating JSX.

## 3.3.9

 * **Bug Fix**
  * Fix super inside of functions.
  * Fix super constructor inheritance.

## 3.3.7

 * **Bug Fix**
  * Add `--use-strict` to valid node flags in `6to5-node`.
  * Fix booleans not being properly stripped from the arguments in `6to5-node`.
  * Force `.js` extension when writing files to directories with `6to5`.

## 3.3.5

 * **Bug Fix**
  * Fix block scoping inside of while loops.
  * Make module name regex more conservative. Thanks [@johlrich](https://github.com/johlrich)!
  * Fix block scoping of constants.
  * Fix istanbul interop.
  * Make JSX transforming more inline with the official transformer with spaces after non-empty last lines.
 * **Polish**
  * Make it illegal to export a property called `__esModule`.

## 3.3.4

 * **Polish**
  * Add istanbul `require` interop.
 * **Bug Fix**
  * Fix incorrect source map column tracking in specific scenarios.

## 3.3.3

 * **Polish**
  * Remap top level `this` to `undefined` instead of throwing an error.
 * **Bug Fix**
  * Run `selfContained` transformer over the regenerator runtime when building `6to5-runtime`.
  * Fix `t.isReferenced` not properly allowing `value` nodes.

## 3.3.1

 * **Bug Fix**
  * Block hoist assignment pattern destructuring.

## 3.3.0

 * **Bug Fix**
  * Do all transforms before the regenerator transform is ran.
 * **New Feature**
  * Added back the 2.x optional runtime.

## 3.2.1

 * **Bug Fix**
  * Fix block scoping transformer rewriting breaks and continues to inner labels.

## 3.2.0

 * **Bug Fix**
  * Fixed scope tracking for default parameters IIFE.
  * Fixed block scoped functions.
  * Improved `bin/6to5` path resolution.
 * **New Feature**
  * You can now trigger super setters in classes. Thanks [@kruppel](https://github.com/kruppel)!
  * Add `resolveSourceMap` option.
  * Better support and output for block scoping loops with labels.

## 3.1.1

 * **Polish**
  * Drop `enumerable: false` clause from class method definitions as `enumerable` already defaults to `false`.
 * **Bug Fix**
  * Properly transform `XJSIdentifier` nodes referencing `this` into a `ThisExpression`.

## 3.1.0

 * **Breaking Change**
  * [Make class methods unenumerable](https://esdiscuss.org/topic/classes-and-enumerability#content-61).

## 3.0.16

 * **Bug Fix**
  * Don't ignore dynamic import specifiers.
 * **Internal**
  * Upgrade `regenerator-6to5`.
 * **Polish**
  * Use `Object.assign` in place of extends helper if it exists.
  * Require individual `lodash` methods. Thanks [@stefanpenner](https://github.com/stefanpenner)!

## 3.0.15

 * **Bug Fix**
  * Use `debug/node` instead of `debug` to avoid browserify using the browser version that references `window`.

## 3.0.14

 * **New Feature**
  * Add `--optional` argument to `6to5-node`.
 * **Bug Fix**
  * Fix bug in `asyncToGenerator` helper where it was incorrectly calling generator iterator functions.

## 3.0.13

 * **Bug Fix**
  * Fix modules loose mode using `modules` instead of `es6.modules`.

## 3.0.12

 * **Internal**
  * Add internal debug messages.
 * **Bug Fix**
  * Add `noScope` option to `traverse.clearProperties`.

## 3.0.11

 * **Bug Fix**
  * Fix `ast-types` `RestElement` definition.
  * Make `es6.forOf` loose mode more versatile and support destructuring.

## 3.0.10

 * **Bug Fix**
  * In `types.getIds` make sure the `declaration` inside of `ExportDeclaration` is actually a `Declaration`.

## 3.0.9

 * **Bug Fix**
  * Make `t.isReferenced` more powerful, actually take into consideration all contexts were identifier nodes aren't actually references.
  * Don't camelcase underscores when converting a string to a valid identifier.

## 3.0.8

 * **Bug Fix**
  * Split up default function declaration exports due to regenerator destroying the parent export declaration.

## 3.0.7

 * **Internal**
  * Upgrade `core-js` to `0.4.9`.
 * **Bug Fix**
  * Add id to function express scope tracking.

## 3.0.6

 * **Bug Fix**
  * Fix block scope variable tracking stopping whenever it hits a new scope.
  * Fix block scope variable tracking breaking on all block statement scopes that have a for loop parent.

## 3.0.5

 * **Internal**
  * More reliable default parameter scope.

## 3.0.4

 * **Bug Fix**
  * Remove traversal stops from block scope tracking.

## 3.0.3

 * **Internal**
  * Ignore options starting with `_`.

## 3.0.2

 * **Internal**
  * Add common plugin options to valid options list.

## 3.0.1

 * **Internal**
  * Downgrade `kexec` as `1.1.0` throws compilation errors.

## 3.0.0

 * **Polish**
  * Generated code autoindentation.
  * Moved global uid registry to a scope registry resulting in nicer uids.
  * `this` is now illegal in the top level scope when using the default `useStrict` transformer.
  * New `asyncToGenerator` helper that's much more compact.
  * Throw errors on unknown options.
  * More reliable default parameter scope.
  * Helpers are now compact and have no newlines.
 * **Internal**
  * Rewritten a lot of the internals to much simpler.
  * Removed TDZ from default parameters as it was very wonky and unreliable.
  * Upgrade `core-js` to `0.4.6`.
  * Upgrade `acorn-6to5`.
   * JSX support is now on-par with react-tools/esprima.
   * Shorthand destructuring.
 * **Bug Fix**
  * Generators now work flawlessly with any parameter transformers.
  * Optional async function transformers should not name their functions.
  * Remove `unlink` event watching in `bin/6to5`.
  * Fix regenerator variable declarations being incorrectly hoisted breaking scope.
  * Transformers that attempted to simplify expressions that had no consequence now take into account whether it's one of the last statements/expressions in the script.
 * **New Feature**
  * New `selfContained` transformer.
  * New `undeclaredVariableCheck` optional transformer.
  * Added `--blacklist` and `--whitelist` options to `6to5-node`.
 * **Breaking Change**
  * Caching is now always enabled for the require hook. It also now no longer caches require resolutions.
  * Bare `super();` only works inside of constructors.
  * Removed the optional runtime in favor of the `selfContained` transformer.
  * This shorthand has been removed from the playground.
  * `6to5/polyfill` can now only be required **once**.
  * **CLI**
    * `--indent` option has been removed.
    * `--include-regenerator` option has been removed.
    * `--amd-modules-id` option has been removed, use `--module-ids` instead.
  * **Options**
    * `amdModuleIds` option has been removed, use `moduleIds` instead.
    * `includeRegenerator` has been removed.
    * `ignoreRegex` fallback has now been dropped from the require hook. `register(/foo/);`, `register({ ignoreRegex: /foo/ })` -> `register({ ignore: /foo/ })`.
  * **Modules**
    * Module interop now only collapses to `module.exports` when there's a **single** export that's default.
    * Imports and exports are now illegal anywhere except the root level by default. Set `modules` to [loose mode](http://6to5.org/docs/usage/loose) to allow them everywhere.
  * **Transformers**
    * Optional fast transformer backwards compatibility support has been removed. Use [loose mode](https://6to5.org/docs/usage/loose).
    * Removed the `coreAliasing` transformer in favor of `selfContained`.
    * Renamed transformers:
     * `specNoForInOfAssignment` -> `validation.noForInOfAssignment`
     * `specSetters` -> `validation.setters`
     * `specBlockScopedFunctions` -> `spec.blockScopedFunctions`
     * `malletOperator` -> `playground.malletOperator`
     * `methodBinding` -> `playground.methodBinding`
     * `memoizationOperator` -> `playground.memoizationOperator`
     * `objectGetterMemoization` -> `playground.objectGetterMemoization`
     * `modules` -> `es6.modules`
     * `propertyNameShorthand` -> `es6.properties.shorthand`
     * `arrayComprehension` -> `es7.comprehensions`
     * `generatorComprehension` -> `es7.comprehensions`
     * `arrowFunctions` -> `es6.arrowFunctions`
     * `classes` -> `es6.classes`
     * `objectSpread` -> `es7.objectSpread`
     * `exponentiationOperator` -> `es7.exponentiationOperator`
     * `spread` -> `es6.spread`
     * `templateLiterals` -> `es6.templateLiterals`
     * `propertyMethodAssignment` -> `es6.properties.shorthand`
     * `computedPropertyNames` -> `es6.properties.computed`
     * `defaultParameters` -> `es6.parameters.default`
     * `restParameters` -> `es6.parameters.rest`
     * `destructuring` -> `es6.destructuring`
     * `forOf` -> `es6.forOf`
     * `unicodeRegex` -> `es6.unicodeRegex`
     * `abstractReferences` -> `es7.abstractReferences`
     * `constants` -> `es6.constants`
     * `letScoping` -> `es6.blockScoping`
     * `blockScopingTDZ` -> `es6.blockScopingTDZ`
     * `generators` -> `regenerator`
     * `protoToAssign` -> `spec.protoToAssign`
     * `typeofSymbol` -> `spec.typeofSymbol`
     * `coreAliasing` -> `selfContained`
     * `undefinedToVoid` -> `spec.undefinedToVoid`
     * `undeclaredVariableCheck` -> `validation.undeclaredVariableCheck`
     * `specPropertyLiterals` -> `minification.propertyLiterals`
     * `specMemberExpressionLiterals` -> `minification.memberExpressionLiterals`

## 2.13.7

 * **Bug Fix**
  * Don't realias variables that are already declared in optional `coreAliasing` transformer.

## 2.13.6

 * **Bug Fix**
  * Add `NewExpression` as a valid parent for parentheses insertion for `ConditionalExpression`.

## 2.13.5

 * **Bug Fix**
  * Allow rest parameters to be destructuring patterns.
 * **Internal**
  * Upgrade `kexec` to `1.1.0`.

## 2.13.4

 * **Bug Fix**
  * Fix ordering of destructuring and default params.
  * Fix loop body scope.
  * Fix `for...of` transformation not retaining it's scope.
  * Add destructuring assignment support to scope tracking.
 * **Polish**
  * More reliable newlines for pretty printing variable declarations.

## 2.13.3

 * **Internal**
  * Add `coverage` and `vendor` to npmignore.

## 2.13.2

 * **Bug Fix**
  * Fix `super` inside of nested functions.
 * **Internal**
  * Move let scoping TDZ into a separate transformer until it's more solid.
  * Use `process.stdin.write` instead of `console.log` in `bin` to avoid sprintfification.

## 2.13.1

 * **New Feature**
  * Temporal dead zone for block binding.

## 2.13.0

 * **New Feature**
  * Block scoped functions.
  * Add `--loose all` option.
  * Add playground mallet operator thanks to [@jridgewell](https://github.com/jridgewell).
 * **Bug Fix**
  * Rewrote large parts of the let scoping transformer. Now passes all known tests.
 * **Internal**
  * Even more optimisations thanks to the awesome [@gaearon](https://github.com/gaearon).
  * Upgrade `acorn-6to5`.
    * Fixes exponentation operator thanks to [@charliesome](https://github.com/charliesome).
    * Fix flow optional parameters with types.
  * Upgrade `chokidar` to `0.12.6`.
  * Upgrade `commander` to `2.6.0`.
  * Upgrade `core-js` to `0.4.5`.
  * Upgrade `estraverse` to `1.9.1`.
  * Upgrade `jshint` to `2.5.11`.
  * Upgrade `regenerator` to `0.8.9`.
  * Upgrade `regexpu` to `1.0.0`.
  * Upgrade `source-map` to `0.1.43`.
  * Upgrade `source-map-support` to `0.2.9`.
  * Upgrade `browserify` to `8.1.1`.
  * Upgrade `chai` to `1.10.0`.
  * Upgrade `istanbul` to `0.3.5`.
  * Upgrade `mocha` to `2.1.0`.
  * Upgrade `uglify-js` to `2.4.16`.

## 2.12.6

 * **Bug Fix**
  * Add missing flow type traversal keys.

## 2.12.5

 * **Internal**
  * Fix incorrect `for...in` loop still causing `ember-script` issues.

## 2.12.4

 * **Polish**
  * Rest parameters now allocate the array before populating.
 * **Internal**
  * `for...in` loops have been changed to optimized `for` loops - better performance and no enumeration of protoype keys.
  * Parts of the code generator have now been optimized thanks to [gaearon](https://github.com/gaearon).

## 2.12.3

 * **Spec Compliancy**
  * Optional `typeof` transformer checks for `undefined` before passing it to the helper.
  * Class methods are now named.

## 2.12.2

 * **Internal**
  * Exclude nodes in function parameters and catch clauses from `isReferenced` check.

## 2.12.1

 * **Internal**
  * Add `.jsx` to list of allowed extensions.

## 2.12.0

 * **Bug Fix**
  * Support non-string JSX literals.
 * **New Feature**
  * Loose mode for some transformers that enables non-spec behavior.
 * **Internal**
  * Uglify `--mangle sort` has been added to the build script, cutting minified scripts in half.

## 2.11.4

 * **Internal**
  * Make all dependency versions fixed.

## 2.11.3

 * **Bug Fix**
  * Allow a string to be passed as the `optional` option.

## 2.11.2

 * **Bug Fix**
  * Support esprima-style catch clause handlers.
 * **Polish**
  * Don't print a stacktrace for syntax errors in the CLI.

## 2.11.1

 * **Bug Fix**
  * Remove stray `console.log` outputting debug code.
  * Remove `Dict` from `coreAliasing`.

## 2.11.0

 * **Bug Fix**
  * Fix unnecessary IIFE in default parameters on method calls.
  * Add support for supers inside of closures.
 * **New Feature**
  * Add `--keep-module-id-extensions`/`keepModuleIdExtensions` option to keep extensions in module ids.
 * **Polish**
  * Special case single argument spread properties in `super` inside classes.
  * Don't use a variable declaration for class declaration IFFE.
  * Rename `inherits` helper parameters.
  * `coreAliasing` transformer now aliases `Promise`, `Set`, `Map` and more. Thanks [@AluisioASG](https://github.com/AluisioASG).

## 2.10.1

 * **Internal**
  * Upgrade `core-js` to `0.4.4`.
 * **New Feature**
  * Added `--include-regenerator` option to CLI and `includeRegenerator` option to API that includes the regenerator runtime if necessary.

## 2.10.0

 * **New Feature**
  * Add `classesFastSuper` optional transformer that doesn't support parent getters and prototype changing.
  * Add `forOfFast` transformer that speeds up `for...of` on arrays but produces more code.
  * Add `--react-compat` to `bin/6to5`.
 * **Spec Compliancy**
  * Disallow setters without a single parameter.
  * Add `configurable` and `writable` to defined properties.
  * Use define instead of assignment for class methods.
 * **Polish**
  * Fix bin name in `6to5-node --help`.
  * Fix shorthand `--whitelist` name in `bin/6to5`.
 * **Internal**
  * Hot code optimisation of traversal etc thanks to [gaearon](https://github.com/gaearon).

## 2.9.4

 * **Bug Fix**
  * Support `UpdateExpression`s as `MemberExpression` objects.

## 2.9.3

 * **Bug Fix**
  * Remove `exportsWildcard` helper in favor of `defaults`.

## 2.9.2

 * **Bug Fix**
  * Pass `exports` to `exportWildcard` helper to allow for use inside the optional runtime.

## 2.9.1

 * **Bug Fix**
  * Fix runtime generator breaking the helper inclusion loop.

## 2.9.0

 * **Internal**
  * Upgrade `acorn-6to5`.
    * Now supports destructuring shorthand properties.

## 2.8.1

 * **Bug Fix**
  * Fix computed accessors on object literals.

## 2.8.0

 * **New Feature**
  * Add `commonStrict`, `amdStrict` and `umdStrict` module formatters that remove `module.exports` interop assignment.
  * Add `--indent` option to the 6to5 CLI.

## 2.7.4

 * **Polish**
  * Inherit assignments from their declaration in destructuring.
  * Properly align multi-declarator variable declarations.

## 2.7.3

 * **Polish**
  * Indent and add newlines to `React.createElement` calls in `react` transformer.
  * Remove `Object.assign` calls and replace it with an `extends` helper.

## 2.7.1

 * **New Feature**
  * Expose `version` on browser and node API.
 * **Internal**
  * Upgrade `core-js` to 0.4.1

## 2.7.0

 * **Spec Compliancy**
  * Disallow reassignments of imports.
 * **New Feature**
  * `reactCompat` option to enable pre-v0.12 react components.

## 2.6.3

 * **Bug Fix**
  * Fix 2.6.0 regression caused by faulty export default from a source handling.

## 2.6.2

 * **Bug Fix**
  * Fix rest parameter keys when on functions with params.

## 2.6.1

 * **Bug Fix**
  * Fix rest parameter arguments key.

## 2.6.0

 * **Bug Fix**
  * Better handling of number literal property keys.
  * Handle `NewExpression` paren insertion edegcases better.
 * **Internal**
  * Fix incorrect AST node `identifier("this")`.
  * Better `toIdentifier` method that handles reserved words.
  * Upgrade `acorn-6to5`.
    * Fix exponentiation operator precedence.
    * Fix line terminators after async contextual keywords.
    * Add semicolons as class elements inside of a class body.
  * Upgrade to `core-js` 4.0.0.
  * Upgrade to `regenerator` 0.8.3.
    * Fix non-loop labeled statements.
 * **New Feature**
  * Basic destructuring defaults
  * Add `.es` to list of supported extensions.
  * Add optional `typeofSymbol` transformer.
  * Use a `for` loop for rest parameters instead of `Array.prototype.slice`.
 * **Polish**
  * Move `"use strict";` to inside module bodies instead of at the top of the file.
  * Better handling of dynamic imports.
 * **Spec Compliancy**
  * Class inheritance now has a `function` or `null` type check.
  * Add `interopRequireWildcard` around wildcard imports and exports to handle non-object exports.

## 2.5.0

 * Remove `noDuplicateProperties` transformer.
 * Better generated UIDs based on nodes.
 * Default parameters now use `arguments[i]`, conditionals and variable declarations instead of using long-form if statements.

## 2.4.10

 * Upgrade `acorn-6to5`.

## 2.4.9

 * Upgrade `acorn-6to5`.
 * Add optional `protoToAssign` transformer.
 * Fix missing properties from computed property keys.
 * Make ES7 comprehensions `let` variables.

## 2.4.8

 * Make `require("6to5/register")` work with browserify - [#370](https://github.com/6to5/6to5/pull/370). Thanks [@hughsk](https://github.com/hughsk)!

## 2.4.7

 * Upgrade `acorn-6to5`.

## 2.4.6

 * Move `coreAliasing` and `undefinedToVoid` transformers down to catch `moduleFormatter` transforms.

## 2.4.5

 * Avoid printing comments if they've already been output.

## 2.4.4

 * Add `module` type to browser build `<script>` handler.
 * Fix some `MemberExpression` modifying incorrectly setting `property` to a `MemberExpression`.

## 2.4.3

 * Upgrade `acorn-6to5`.
 * Add support for `FunctionDeclaration`s in `bluebirdCoroutines` and `asyncToGenerators` transformers.

## 2.4.2

 * Upgrade `acorn-6to5`.
 * Better uids generated for various transformers based on parent node.
 * Alias flat references in `coreAliasing` transformer.

## 2.4.1

 * Better whitespace handling of parenthesized expressions due to trailing comments.
 * Fix `yield` inside of comprehensions.

## 2.4.0

 * Use a closure always for classes with a super.
 * Always use native loops for array comprehensions.
 * Allow `yield` inside of comprehensions.
 * Add optional `bluebirdCoroutine` transformer.
 * Add optional `asyncToGenerator` transformer.
 * Move `useStrict` transformer to before `_moduleFormatter` causing `"use strict";` to always be placed the very top.

## 2.3.2

 * Add parens on expressions with trailing comments.

## 2.3.1

 * Add `undefinedToVoid` optional transformer.
 * Use `Object.defineProperty` for computed properties.

## 2.3.0

 * Upgrade `acorn-6to5`.
 * Support circular references and hoist variable declarations in `system` module formatter.
 * Add optional transformers, including a new `coreAliasing` transformer that aliases native ES6 static properties to their `core-js` equivalent.

## 2.2.0

 * Make `system` module formatter modules anonymous by default.
 * Fix duplicate comments being output, breaking code.

## 2.1.0

 * Add `cache` option to register hook.
 * Update `core-js`.
 * Fix starting newline not being added on case statements.
 * Fix destructuring `VariableDeclaration`s not inside `BlockStatement`s and `Program`.

## 2.0.4

 * Avoid being greedy when destructuring array iterables.

## 2.0.3

 * Hoist function declarations in system module formatter for circular references.
 * Hoist default function declarations in umd and amd module formatters for circular references.

## 2.0.2

 * Inherit comments in `for-of` transformer.
 * Remove `interopRequire` from `system` module formatter.

## 2.0.1

 * Remap `UpdateExpression` module export binding.
 * Fix automatic closure on `PrivateDeclaration` in classes.

## 2.0.0

 * Make string literal generation only escapes unicode that it has to.
 * Internal code generation format options have been exposed.
 * Change playground method binding operator from `:` to `#` removing ambiguous syntax with terns.
 * Fix rest parameters in async and generator functions.
 * Export/import declarations replace by the modules transformer now inherit comments.
 * Added playground flag to `6to5-node`.
 * `6to5-node` now behaves the same as `node`.
 * `6to5-node` now uses `kexec` to become the forked process to correctly propagate signals on unix.
 * Constants are now block scoped.
 * Exposed ast transformer.
 * Merged `commonInterop` and `common` module formatters.
 * Fix generator comprehensions not inheriting `arguments`, `this` etc.
 * Object and class mutator shorthand are now enumerable.
 * Remove regenerator `Generator has already finished` error which isn't spec-compliant.
 * Expose internal `spec` transformers that nicen up code output.
 * Add export variable declaration default initializers.
 * Propagate export declaration reassignments.
 * Add initializer default to block scoped variable declarations within a loop.
 * Flow type support.
 * Make async/await contextual keywords.
 * Allow `yield`ing of non-objects.
 * Class declarations now lack an IIFE.
 * Support falsy and `null` super classes.
 * Add support for experimental abstract references `private` declarations.
 * Leave out IIFE for class declarations.
 * Switched to [core-js](https://github.com/zloirock/core-js) from [es6-symbol](https://github.com/medikoo/es6-symbol) and [es6-shim](https://github.com/paulmillr/es6-shim/) for built-in polyfill.
 * `amd` and `umd` module formatters now behave the same as `common` with `interopRequire`.
 * Micro-optimizations to boost performance by 200%.
 * Rename module formatter methods `import` to `importDeclaration` and `export` to `exportDeclaration`.
 * Support multiple declarators in export variable declarations.
 * Freeze tagged template literal object.
 * Remove inlined `regenerator` fork.
 * Remove `ParenthesizedExpression`.
 * Rename `object-spread` helper to `object-without-properties`.
 * Rename `class-props` helper to `prototype-properties`.
 * Rename `extends` helper to `inherits`.
 * Completely rewritten `system` module formatter.

## 1.15.0

 * Don't alias `GeneratorFunction` and check the name which causes minifiers to remove the name and throw an error later on when we check if it's set.

## 1.14.18

 * Fix files only containg comments not being output.
 * Fix duplicate comments on property key shorthands.

## 1.14.17

 * Add default initializer to let variables within loop bodies.
 * Fix excessive `break` replacement inside of switches in let scoping.

## 1.14.16

 * Add object getter memos and this shorthand to playground.
 * Fix while loops in let scoping.
 * Upgrade `acorn-6to5`.

## 1.14.14

 * Fix template literals escaping.

## 1.14.13

 * Fix let scoping of `while` loops.
 * Make class methods enumerable.

## 1.14.12

 * Fix duplicate dynamic expressions in call spread.

## 1.14.10

 * Fix let scoping unneccesary override.

## 1.14.6

 * Avoid ensuring a block on non-array node replacements.

## 1.14.5

 * Upgrade `acorn-6to5`.
 * Fix JSON recursion error for unknown code generator node types.
 * Ensure that a statement is a block on block/statement types when replacing them with multiple nodes.

## 1.14.4

 * Merge pretzel maps and method binding.

## 1.14.3

 * Add playground pretzel maps.

## 1.14.2

 * Fix `commonInterop` default export handling.
 * Fix keyworded property key identifiers being turned into computed property key literals.

## 1.14.1

 * Inherit comments from `ClassDeclaration`.

## 1.14.0

 * Add [playground](https://6to5.github.io/playground.html).

## 1.13.13

 * Fix `--debug` in `bin/6to5-node`. Thanks [@timoxley](https://github.com/timoxley).

## 1.13.12

 * Ignore `XJSEmptyExpression`s in `react` transformer output.

## 1.13.11

 * Fix `util.regexify` on falsy values.
 * Fix `_aliasFunction` with rest parameters.
 * Export as `module.exports` instead of `exports.default` if there are no other `ExportDeclaration`s in `commonInterop` module formatter.
 * Add `system` module formatter. Thanks [@douglasduteil](https://github.com/douglasduteil).

## 1.13.10

 * Add support for `AssignmentExpression` destructuring outside of `ExpressionStatement`.

## 1.13.9

 * Fix `VirtualPropertyExpression` visitor keys.

## 1.13.8

 * Only use a single reference in abstract references.

## 1.13.7

 * Upgrade `acorn-6to5`.
 * Add experimental exponentiation operator support.

## 1.13.6

 * Fix experimental object spread/rest helper.

## 1.13.5

 * Upgrade `acorn-6to5`.
 * Add experimental support for object spread/rest.
 * Change `arguments` to array to an additional helper method.

## 1.13.4

 * Fix single spread element returning itself.

## 1.13.3

 * Upgrade `acorn-6to5`.
 * Add experimental support for abstract references.

## 1.13.2

 * Optimize `Array.from` usage by adding a helper method.
 * Upgrade `acorn-6to5`.

## 1.13.1

 * Fix constructor spread optimisation. Thanks [@zloirock](https://github.com/zloirock).

## 1.13.0

 * Put experimental ES7 features behind a flag `--experimental` and `experimental` option.
 * Constructor spread performance increase. Thanks [@RReverser](https://github.com/RReverser).
 * Use `self` instead of `window` in the optional 6to5 runtime. Thanks [@RReverser](https://github.com/RReverser).

## 1.12.26

 * Support computed property destructuring.

## 1.12.25

 * Update `acorn-6to5`, `ast-types`, `es6-shim`, `chokidar`, `estraverse` and `private`.

## 1.12.24

 * Collect references that haven't been declared in scope.

## 1.12.23

 * Fix generator function export hoisting.

## 1.12.22

 * Update `fs-readdir-recursive` and `chokidar`.
 * Support array destructuring on iterables.
 * Make amd module id optional. Thanks [@webpro](https://github.com/webpro).

## 1.12.21

 * Fix unneccesary let scoping replacement.
 * Add `commonInterop` module formatter. Thanks [@Naddiseo](https://github.com/Naddiseo).
 * Fix `return` outside of function body bug. Thanks [@brentburg](https://github.com/brentburg).
 * Add more flexible option types.

## 1.12.20

 * Append `sourceMappingURL` when using `bin/6to5` and output sourcemaps.

## 1.12.19

 * Add `comments` option and `--remove-comments` flag. Thanks [@webpro](htps://github.com/webpro).
 * Embed `regenerator`.

## 1.12.18

 * Use `global` reference instead of `window`.

## 1.12.17

 * Add `moduleName`, `sourceRoot` and `filenameRelative` options. Thanks [@darvelo](https://github.com/darvelo).
 * Traversal optimisations.

## 1.12.16

 * Fix comments not being retained from `MethodDefinition` in classes.
 * Add temporal dead zone in default parameters.

## 1.12.15

 * Update `acorn-6to5`.

## 1.12.14

 * Fix duplicate let scoping in functions.
 * Make JSX whitespace more React-compliant.
 * Add `_memberExpressionKeywords` transformer that turns keyword identifiers to computed literals.
 * Upgrade `regenerator-6to5`.

## 1.12.13

 * Support duplicate constants within different block scopes.
 * Fix for-head duplication testing and replacement.
 * Support `raw` property on tagged template literals.

## 1.12.12

 * Make scope tracker more reliable to handle all edgecases.

## 1.12.11

 * Block scope classes.
 * Fix generation of integer `Literal`s in `MemberExpression`.

## 1.12.10

 * Fix let scoping var hoisting.

## 1.12.9

 * Escape unicode characters when generating string `Literal`s.
 * Fix semicolons being output for statements in `ExportDeclaration`.
 * Fix `WithStatement` missing parenthesis.

## 1.12.8

 * Temporarily forbid `AssignmentExpression` destructuring outside of `ExpressionStatement`.

## 1.12.7

 * Update to latest `acorn-6to5`.

## 1.12.6

 * Update to latest `acorn-6to5`.

## 1.12.5

 * Fix excessive whitespace trimming resulting in innaccurate sourcemap line.

## 1.12.4

 * Add `doc` folder for documentation.

## 1.12.3

 * Support generator comprehensions.
 * Use `Array.from` instead of `Array.prototype.slice` in spread transformer.
 * Support spread in `NewExpression`s.

## 1.12.2

 * Upgrade `matcha` to `0.6.0` and `browserify` to `6.3.2`.
 * Add own `trimRight` helper instead of relying on the string instance method.
 * Support JSX spreads that aren't the first.

## 1.12.1

 * Fix `this` and `arguments` mapping in the `_aliasFunctions` transformer.

## 1.12.0

 * Combine `jsx` and `react` transformers to `react`.
 * Update `react` syntax output to React v0.12.

## 1.11.15

 * Fix JSX literal whitespace generation.

## 1.11.14

 * Avoid using a switch for let-scoping continue and break statements and use an if statement instead.
 * Remove excess whitespace and newlines from JSX literals.

## 1.11.13

 * Update regenerator-6to5
 * Add support for most escodegen formatting options
