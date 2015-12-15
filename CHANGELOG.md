# Changelog

> **Tags:**
> - [New Feature]
> - [Bug Fix]
> - [Spec Compliancy]
> - [Breaking Change]
> - [Documentation]
> - [Internal]
> - [Polish]

_Note: Gaps between patch versions are faulty, broken or test releases._

See [CHANGELOG - 6to5](CHANGELOG-6to5.md) for the pre-4.0.0 version changelog.

## Unreleased

  * **Internal**

    * `babel-types`: Start test suite.

## 6.4.3 (2016-01-13)

* **Bug Fix**
 * `babel-plugin-transform-es2015-typeof-symbol`: [#3250](https://github.com/babel/babel/pull/3250) The typeof transform should always use the global `Symbol`.
 * `babel-plugin-transform-es2015-modules-amd`: [#3252](https://github.com/babel/babel/pull/3252) Stop leaking directives
 * `babel-pluginn-transform-es2015-unicode-regex`: [#3259](https://github.com/babel/babel/pull/3259) Use only `regexpu-core` instead of all of `regexpu`
 * `babel-generator`: [Fix minified labeledStatement printing](https://github.com/babel/babel/commit/0d9459dbb65f7a717d97ec8c723935ae9a83bcf1)
 * `babel-plugin-transform-regenerator`: [#3162](https://github.com/babel/babel/pull/3162) Make sure babel helper picks up `regeneratorRuntime`

* **Polish**
 * `babel-types`: [#3261](https://github.com/babel/babel/pull/3261) Add ArrayExpression.elements.default
 * `babel-register`: [#3232](https://github.com/babel/babel/pull/3232) Make sure the cache file's directory exists

* **Documentation**
 * `babel-generator-options`: [#3251](https://github.com/babel/babel/pull/3251) Document babel-generator options

## 6.4.2 (2016-01-06)

* **Bug Fix**
 * `babylon`: [#3244](https://github.com/babel/babel/pull/3244) fix error location for class properties with a missing semicolon (Ref [#3225](https://github.com/babel/babel/pull/3225)).
 * `babel-plugin-transform-es2015-parameters`: [#3246](https://github.com/babel/babel/pull/3246) Support expressions in rest arg access for `arguments.length` optimization.
 * `babel-generator`: [#3247](https://github.com/babel/babel/pull/3247) Parenthesize await/yield expression in `BinaryExpression` (Ref [#3229](https://github.com/babel/babel/pull/3229)).

## 6.4.1 (2016-01-06)

* **Bug Fix**
 * `babel-types`: [#3245](https://github.com/babel/babel/pull/3245) Temporarily revert adding the `Binary` alias [#3217](https://github.com/babel/babel/pull/3217) and tests.

## 6.4.0 (2016-01-06)

Thanks to @samwgoldman for all the new flow support!

* **New Feature**
 * `babylon`, `babel-types`, `babel-generator`: [#3202](https://github.com/babel/babel/pull/3202) Add support for `this` flow type.
 * `babylon`, `babel-types`, `babel-generator`: [#3236](https://github.com/babel/babel/pull/3236) Add support for `export interface` flow syntax.
 * `babylon`, `babel-types`, `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-flow-comments`: [#3230](https://github.com/babel/babel/pull/3230) Add support for `declare type` and `declare interface` flow syntax.
 * `babylon`, `babel-types`, `babel-generator`, `babel-plugin-transform-flow-strip-types`, `babel-plugin-transform-flow-comments`: [#3203](https://github.com/babel/babel/pull/3203) Add support for flow mixins.
 * `babel-cli`: [#3221](https://github.com/babel/babel/pull/3221): Handle `--nolazy` flag.
 * `babel-plugin-transform-es2015-modules-systemjs`: [#3166](https://github.com/babel/babel/pull/3166) Add `__moduleName` support to `System.register`. Thanks @guybedford!

* **Bug Fix**
 * `babel-plugin-transform-es2015-parameters`: [#3214](https://github.com/babel/babel/pull/3214) Bugfix for `arguments.length` optimization having the wrong length. Thanks @fabiomcosta!
 * `babylon`: [#3220](https://github.com/babel/babel/pull/3220) Don't parse parenthesized string as a `Directive`.
 * `babel-helpers`: [#3218](https://github.com/babel/babel/pull/3218) Defer to the built-in `typeof` if support for Symbols exists. Thanks @jdalton!
 * `babel-generator`: [#3213](https://github.com/babel/babel/pull/3213) Fix various parentheses bugs.
 * `babel-plugin-transform-react-display-name`: [#3216](https://github.com/babel/babel/pull/3216) More relaxed `displayName` inference.
 * `babel-helper-function-name`: [#3215](https://github.com/babel/babel/pull/3215) Set function names from `AssignmentExpression`. Thanks @spicyj!
 * `babel-generator`: [#3210](https://github.com/babel/babel/pull/3210) Use a print stack to determine in parenthesis needs to be added.
 * `babel-plugin-transform-runtime`: [#3235](https://github.com/babel/babel/pull/3235) Ensure `opts.polyfill = false` behaves correctly for all visitors. Thanks @guybedford!
 * `babel-plugin-transform-runtime`: Ensure `regenerator` option doesn't cancel out core-js polyfill.
 * `babel-generator`: [#3229](https://github.com/babel/babel/pull/3229) Check for parentheses for `AwaitExpressions` and fix over-parentheses in `YieldExpressions`.

* **Breaking Change** (Accidental)
 * `babylon`: [#3225](https://github.com/babel/babel/pull/3225) throw parse error if class properties do not have a semicolon.
 * `babel-types`: [#3195](https://github.com/babel/babel/pull/3195) Allow `JSXText` node in `JSXElement` children property and remove `StringLiteral`.

* **Documentation**
 * `babel-generator`: [#3240](https://github.com/babel/babel/pull/3240) Fix small in babel-generator README sample code. Thanks @athaeryn!

* **Internal**
 * `babel-plugin-external-helpers`: [#3205](https://github.com/babel/babel/pull/3205) Renamed from `babel-plugin-external-helpers-2` due to someone taking the npm name beforehand.
 * [#3233](https://github.com/babel/babel/pull/3233) Update LICENSE end date to 2016. Thanks @maclover7!
 * `babylon`: [#3204](https://github.com/babel/babel/pull/3204) Prevent users from patching by building it.
 * `babel-types`: [#3217](https://github.com/babel/babel/pull/3217) Add `Binary` alias to `AssignmentExpression`.

## 6.3.26

* **Bug Fix**
 * `babel-plugin-transform-es2015-parameters`: [#3191](https://github.com/babel/babel/pull/3191) Fix the order of arguments initialization (fixes [T6809](http://phabricator.babeljs.io/T6809))
 * `babel-traverse`: [#3198](https://github.com/babel/babel/pull/3198) In `evaluate()`, it should not mistake lack of confidence for falsy

* **Spec Compliancy**
 * `babylon`, `babel-generator`, `babel-plugin-transform-regenerator`: [#3190](https://github.com/babel/babel/pull/3190): Remove `await *` from `babylon` and raise an error for that syntax since it was removed from the proposal and was causing an issue at runtime but not at compile time (fixes [T6688](http://phabricator.babeljs.io/T6688)).

* **Internal**
 * Fix gulp build path to work on windows (fixes [T6855](http://phabricator.babeljs.io/T6855)).
 * `babel`: [#3193](https://github.com/babel/babel/pull/3193) Point users to the cli docs
 * `babel-core`: [#3196](https://github.com/babel/babel/pull/3196) Add a test for checking plugins/presets are resolved relative to `filename`

## 6.3.25

* **Bug Fix**
 * `babylon`: [#3187](https://github.com/babel/babel/pull/3187) Multiple `"use strict"` in function causes outer scope to be parsed as strict
 * `babel-generator`: [#3188](https://github.com/babel/babel/pull/3188) Correctly set `format.quotes` to `opts.quotes`
 * `babel-generator`: [#3189](https://github.com/babel/babel/pull/3189) JSX attributes should use double qoutes
 * `babel-traverse`: [#3192](https://github.com/babel/babel/pull/3192) Fixed static evaluation bug

* **Internal**
 * `babel-plugin-transform-es2015-parameters`: [#3165](https://github.com/babel/babel/pull/3165) Optimize `arguments` access

## 6.3.24

* **Bug Fix**
 * [#3184](https://github.com/babel/babel/pull/3184) Fixed overly permissive type inference.

## 6.3.22-6.3.23

 > Skipped 6.3.22.

* **Internal**
 * Renamed the `Flow Comments` plugin from `babel-plugin-flow-comments` to `babel-plugin-transform-flow-comments` for naming consistency.

## 6.3.21

 * **Bug Fix**
  * `babel-generator`: [#3173](https://github.com/babel/babel/pull/3173) Fix unhandled new-precedence edge cases regarding parentheses (fixes [T6829](https://phabricator.babeljs.io/T6829)).
  * `babel-generator`: [#3180](https://github.com/babel/babel/pull/3180) Handle nested `IfStatement` with an `alternate.
  * `babel-generator`: [#3182](https://github.com/babel/babel/pull/3182) Parenthesize `ArrowFunctionExpression` when part of a `LogicalExpression` or `BinaryExpression` (fixes [T6836](https://phabricator.babeljs.io/T6836)).
  * `babel-traverse`: [#3171](https://github.com/babel/babel/pull/3171) Fix infinite recursion bug with `introspection` method.
  * `transform-es2015-function-name`: [#3176](https://github.com/babel/babel/pull/3176) Stop transforming `ObjectMethod` (`MethodDefinition`) to a `FunctionExpression` since the `transform-es2015-shorthand-properties` plugin already does it.
  * `transform-es2015-parameters`: [#3143](https://github.com/babel/babel/pull/3143) Optimizations for `RestElement` such as using `arguments.length` (fixes [T6774](https://phabricator.babeljs.io/T6774)).

 * **Documentation**
  * `babel-core`: [#3177](https://github.com/babel/babel/pull/3177) Clarify description of `comments` file config.

 * **Internal**
  * `*`: [#3179](https://github.com/babel/babel/pull/3179) Update flow to 0.20.0 and add `@noflow` until types are added in.
  * `babel-generator`: [#3178](https://github.com/babel/babel/pull/3178) Fix type annotation for `shouldPrintComment`.

## 6.3.20

 * **Bug Fix**
  * `babel-generator`: [#3170](https://github.com/babel/babel/pull/3170) Fix invalid code generation for numeric `MemberExpression` (`5.toString()` -> `5..toString()`).
  * `babel-types`: [#3172](https://github.com/babel/babel/pull/3172) Add `Expression` alias to `BindExpression`.

## 6.3.19

 * **New Feature**
  * `babel-plugin-flow-comments`: [#3157](https://github.com/babel/babel/pull/3157) Move `babel-plugin-flow-comments` to the babel repo and update for babel 6.

 * **Bug Fix**
  * `babel-runtime`: [#3142](https://github.com/babel/babel/pull/3142) Add a custom transform for `babel-runtime` builds to avoid circular dependencies (Fixes the `babel-runtime/helpers/typeof` issue).
  * `babel-traverse`: [#3161](https://github.com/babel/babel/pull/3161) Only rename the *outer function bindings on name conflict.
  * `babel-generator`: [#3167](https://github.com/babel/babel/pull/3167) Use the left most node from the right to check if we need spaces in `BinaryExpressions`.

## 6.3.18

 * **Bug Fix**
  * `babylon`: [#3107](https://github.com/babel/babel/pull/3107) Fix incorrect directive parsing
  * `babel-generator`: [#3158](https://github.com/babel/babel/pull/3158) Parenthesize object expression when it may end up at the start of an expression
  * `babel-plugin-transform-regenerator`: [#3160](https://github.com/babel/babel/pull/3160) Fix typo

 * **Polish**
  * `babel-types`: [#2933](https://github.com/babel/babel/pull/2933) Generate documentation for babel-types.
  * `babel-plugin-transform-es2015-parameter`: [#2833](https://github.com/babel/babel/pull/2833) Optimize `arguments` usage.
  * `babel-messages`: [#3123](https://github.com/babel/babel/pull/3123) clarify `traverseNeedsParent` message.

## 6.3.17

 * **Bug Fix**
  * `babel-types`: [#3153](https://github.com/babel/babel/pull/3153) DoWhileStatement should take node type `Statement` as body.

 * **New Feature**
  * `babel-generator`: [#3152](https://github.com/babel/babel/pull/3152) Add a new minified format option to do possibly dangerous byte saving.

 * **Internal**
  * `babel-traverse`: [#3151](https://github.com/babel/babel/pull/3151) Support ObjectProperty in `Scope.isPure`

 * **Polish**
  * `babel-cli`: [#3150](https://github.com/babel/babel/pull/3150) Do not prefer global when installing babel-cli

## 6.3.16

 * **Bug Fix**
  * `babel-traverse`:
    * [#3137](https://github.com/babel/babel/pull/3137) Set the correct `parent` and `parentPath` for new a `NodePath` (fixes an issue with `export * from './a'` and `es2015-modules-commonjs`).
  * `babel-generator`:
    * [#3145](https://github.com/babel/babel/pull/3146) Always print `""` in `compact` mode for consistency (gzip). Will be changed in a new mode (a supserset of `compact`) in a later patch.
    * [#3146](https://github.com/babel/babel/pull/3146) Don't print comments in `compact` mode.
    * [#3147](https://github.com/babel/babel/pull/3147) Don't print parentheses on `throw` statements with `SequenceExpression`.

 * **Internal**
  * `babel-traverse`:
    * [#3138](https://github.com/babel/babel/pull/3138) Support `UnaryExpression` in `isPure` check.

## 6.3.15

 * **Bug Fix**
  * `babel-generator`:
    * [#3111](https://github.com/babel/babel/pull/3111) Compact Mode: remove unnecessary `()` from a `NewExpressions` when possible (`new x()` -> `new x`).
  * `babel-helper-function-name`:
    * [#3138](https://github.com/babel/babel/pull/3138) Skip name inference on certain uses of classes until we can handle them.
  * `babel-traverse`:
    * [#3141](https://github.com/babel/babel/pull/3141) Fix bug with evaluating an expression on its own binding.
  * `babel-plugin-transform-es2015-destructuring`:
    * [#3136](https://github.com/babel/babel/pull/3136) Seperate the destructuring statement from the export statement before converting.
  * `babel-plugin-transform-es2015-classes`:
    * [#3134](https://github.com/babel/babel/pull/3134) Ensure default exports have a name before splitting them.
    * [#3135](https://github.com/babel/babel/pull/3135) Pass `async` and `generator` properties when converting a `ClassMethod`.

## 6.3.14

 * **Bug Fix**
  * `babel-traverse`:
    * [#3133](https://github.com/babel/babel/pull/3133) Fix regression with scope in switch statement (fixes an issue with `transform-es2015-spread`). Related to [#3127](https://github.com/babel/babel/pull/3127).

## 6.3.8-6.3.13

 Testing [lerna](https://github.com/sebmck/lerna) - A tool for managing JavaScript projects with multiple packages.

 * **Bug Fix**
  * `babylon`, `babel-types`, `babel-generator`:
    * [#3130](https://github.com/babel/babel/pull/3130) Add support for `NullLiteralTypeAnnotation` (`null` literal type) in flow.

## 6.3.2

 * **Bug Fix**
  * `babel-core`:
    * [#3108](https://github.com/babel/babel/pull/3108) Omit sourcemaps that cannot be used and fix source path.
  * `babel-register`:
    * [#3116](https://github.com/babel/babel/pull/3116) Disable processing `.babelrc` a second time.
  * `babel-traverse`:
    * [#3127](https://github.com/babel/babel/pull/3127) Ensure we always push into a `BlockStatement` (fixes a `babel-plugin-transform-class-properties` issue).
  * `babel-plugin-transform-class-properties`:
    * [#3113](https://github.com/babel/babel/pull/3113) Fix issue with using static class properties.
  * `babel-plugin-transform-es2015-classes`:
    * [#3112](https://github.com/babel/babel/pull/3112) Fix issue with `return super()` in class constructor causing a `super() hasn't been called` error.
  * `babel-plugin-transform-inline-environment-variables`:
    * Fix typo with `replaceWith`.
  * `babel-plugin-transform-regenerator`:
    * [#3119](https://github.com/babel/babel/pull/3119) Ensure that generator functions always have an `Identifier` (fixes an issue with exporting a generator as a default).

## 6.3.1

 * **Bug Fix**
  * `babel-generator`:
    * [#3121](https://github.com/babel/babel/pull/3121) Fix spacing in binary expression when right is a binary expression and has a unary on the left in compact mode. Ex: `(a+(+b*2))` should be -> `a+ +b*2`

## 6.3.0

 * **Bug Fix**
  * Fix use of old `literal` to use `stringLiteral` in babel-types.
  * Fix issue with `babel-template` crashing in IE due to unpopulated error stack.
  * Check for empty decorators list in `transform-class-properties`
  * Fix babylon parser not allowing multiple parameters in arrow functions with flow types
  * Fix exported async functions being hoisted and as a result being undefined.

 * **Polish**
  * Add validation to more JSX node types.
  * Add validation for CallExpression, NewExpression, SequenceExpression, ArrayExpression, and TemplateLiteral.
  * Add `ObjectMember` abstract type to AST for `ObjectProperty` and `ObjectMethod`.
  * Optimize `asyncToGenerator` helper template.
  * Respect spacing for assignment, binary expressions, and while loop in compact mode.
  * Fix up semicolon omission in compact mode.

## 6.2.2

 * **Bug Fix**
  * Fix ES2015 classes being revisited twice causing state issues when inside.

## 6.2.1

 * **Polish**
  * Add `dirname` to unknown plugin resolution error.

## 6.2.0

 * **New Feature**
  * Add support for `function.sent`.
 * **Internal**
  * Bump `invariant` depenency version.
 * **Polish**
  * Infer filename from the base directory when resolving plugins and presets.
  * Allow JSX pragma to be specified in line comments.
 * **Bug Fix**
  * Print a block when encountering consequents that are if statements.
  * Fix some issues related to printing of auxiliary comments.

## 6.1.21

 * **Bug Fix**
  * Add check to avoid revisiting classes.
 * **Internal**
  * Add internal aliases for plugins for debugging.
 * **Bug Fix**
  * Avoid duplicate auxiliary starts if inside an aux section.

## 6.1.20

 * **Polish**
  * Only infer whitespace when we've been passed tokens in the code generator.
  * Refactor JSX inlining to reduce parsing cost.
 * **Bug Fix**
  * Fix queueing of nested paths being pushed onto the priority queue.

## 6.1.19

 * **Bug Fix**
  * Add config check to `package.json` `babel` reading.
  * Fix source maps merging.
  * Ignore callee supers when doing spread compilation
* **Polish**
  * Add hard error when we see decorators.

## 6.1.4

 * **Bug Fix**
  * Fix class transformation bug for export declarations with no `id`.
  * Fix regenerator plugin being passed an invalid function `id`.
  * Add support for async to generator helper on object and class methods.
  * Fix looking up undefined nodes when walking back up the tree in typeof symbol plugin.
  * Fix accidental serialisation of template literals in the code generator when the object of a member expression.
  * Add missing `Expression` alias to `TypeCastExpression`.
  * Move `children` prop pushing to after props to ensure correct order in the react inline elements plugin.
  * Fix `buildExternalHelpers` script ignoring non-underscored helpers.
  * Fix exported classes with static class properties.
 * **Spec Compliancy**
  * Add support for computed mutators in `babel-plugin-transform-es2015-computed-properties`.
 * **Polish**
  * Make interop for plugins with the `__esModule` work for all plugins no matter how they're imported/specified.
  * Make it illegal for plugins to specify a catch-all `enter`/`exit` visitor method.
  * Ignore `babel-runtime` version mismatch in `babel-doctor`.
  * Omit `defaultProps` helper when there are no props in the react inline elements plugin.
  * Add validators for ES2015 export nodes.
  * Add missing core node validators.
  * Update `runtime` plugin `core-js` definitions.
 * **Internal**
  * Add `babel-plugin-transform-react-display-name` to the `react` preset.
  * Clean up scope cache.
  * Move `babel/register` into a separate `babel-register` package.
  * Add `react-jsx-source` plugin and add it to the `react` preset.

## 6.1.3

 * **Internal**
  * Add `allowTopLevelThis` option to `babel-plugin-transform-es2015-modules-commonjs`.

## 6.1.2

 * **Bug Fix**
  * Fix bug where the parser wouldn't allow typed annotated default parametesr in arrow functions.
  * Add existence check to `NodePath#has` to ensure safeness when making comparisons.
  * Protect against replacing a class expression with a name inferred version that would
    result in it never being transformed.
  * When transforming JSX to an inline object, make sure invalid identifier keys are quoted.
  * Fix recursion in async to generator transforms due to referring to the inner generator function.
  * Convert arrow functions to normal functions when remapping to a generator.
  * Fix source map merging.
  * Add line break test to the `updateContext` of `name` tokens in the parser to fix parsing of JSX and regexs with ASI.
  * Fix object rest/spread in arrow function parameters not being allowed in the parser.
  * Ensure that unaries are parenthesised the same as function expressions.
 * **Internal**
  * Move `Symbol.hasInstance` transform out of `babel-plugin-es2015-symbols` to `babel-plugin-es2015-instanceof` as it has nothing to do with symbols.
  * Add `babel-browser` package with the browser build.
 * **Polish**
  * Add npm 3 check to `babel-doctor`.
  * Autoclear the `babel/register` cache when it gets too big to be serialised.
 * **Spec Compliancy**
  * Add support for flow existential type parameters.

## 6.1.1

 * **Bug Fix**
  * Stop looking for configs in `babel-doctor` when we get to the root.

## 6.1.0

 * **New Feature**
  * Add `babel-doctor` CLI.

## 6.0.20

 * **Bug Fix**
  * In the callable class constructor plugin, don't transform derived classes as the constructor call cannot be inherited.
  * Fix JSX inline elements plugin from attempting to create properties out of JSX containers.
  * Fix infinite recursion error when attempting to resolve the execution status of functions that contain references to themselves.

## 6.0.19

 * **Bug Fix**
  * Fix function paths not being accurate.
 * **Polish**
  * Change `t.getOuterBindingIdentifiers` to completely ignore function expressions as they cause no outer bindings to be set.
  * Clean up `auxiliaryComment` option.

## 6.0.18

 * **Polish**
  * Add error when calling builder methods with too many arguments than it can take.
  * Rename `RegexLiteral` node to `RegExpLiteral`.
  * Rename `NumberLiteral` node to `NumericLiteral`.
 * **Bug Fix**
  * Make all fields of a `ForStatement` optional.

## 6.0.17

 * **Polish**
  * Add `Symbol` existence check to `typeof` helper.
 * **Bug Fix**
  * When merging options, take precedence over the current array.
  * Fix export of parameters when renaming the binding of exported functions.
  * Fix minify booleans plugin.
  * Fix simplify comparison operator plugin.
  * Don't include children if it's empty in react inline elements plugin.

## 6.0.16

 * **Internal**
  * Instead of throwing on a foreign node path. Ignore it and create a new one.
 * **Bug Fix**
  * Ensure there's a newline after prepended original shebang.
  * Ignore non-origin template nodes when replacing placeholders in `babel-template`.
  * Fix `runtime` plugin helper generation.
  * Fix bug where async class methods weren't having their `await`s converted to `yield`s in the async to generator helper.

## 6.0.15

 * **Bug Fix**
  * Fix async function remap helper from outputing incorrect calls causing wrong scoping.

## 6.0.14

 * **Spec Compliancy**
  * Update exponentiation operator precedence.
  * Fix parser bug where arrow functions have a higher precedence than they should.
 * **Bug Fix**
  * Fix SystemJS module formatter exporting function parameters.
  * Ensure that invalid identifier JSX attribute keys are quoted when transforming to calls.
  * Fix ES3 property literal plugin.
  * Fix parameters after defaults in arrow functions refering to the wrong `arguments`.

## 6.0.13

 * **Bug Fix**
  * Don't consider uncomputed object method property identifier to be a reference.

## 6.0.12

 * **Bug Fix**
  * Rename misspelt `babel-plugin-transform-class-constructor-call` package.
  * Add strict mode plugin to module transforms.
  * Only ignore cloning of plugin instances when cloning babelrc configs.
  * Add shebang to bin file in `babel` complain package.
  * Remove asserts from `babel-transform-regenerator` as we may have multiple packages interacting.
  * Add `babel-plugin-transform-es2015-modules-commonjs` to `babel-preset-es2015`.

## 6.0.0

 * **Internal**
  * Split up internals into packages.
 * **Breaking Change**
  * Remove `loose` option in favor of plugin options.
  * Remove `optional`, `whitelist` and `blacklist` options since plugins are now explicitly defined.
  * Plugins now just return a plain object rather than construct a `Plugin` instance.
  * Change the signature of visitor methods to `.call(state, path, state)` rather than `.call(path, node, parent, scope, state)`.
  * All plugin traversals are now merged for performance.
  * The `MethodDefinition` node type has been renamed to `ClassMethod` and it's `FunctionExpression` `value` property has been coerced into the main method node.
  * The `Property` node type has been renamed to `ObjectProperty`.
  * The `Property` node type with the boolean flag `method` has been renamed to `ObjectMethod` and it's `FunctionExpression` `value` property has been coerced into the main method node.
  * The `Literal` node type has been unoverloaded and split into `BooleanLiteral`, `RegExpLiteral`, `NumericLiteral`, `StringLiteral` and `NullLiteral`.
  * The `SpreadProperty` (from `object-rest-spread`) node type has been split into `RestProperty` (for `ObjectPattern`) and `SpreadProperty` (for `ObjectExpression`)
  * Remove `module.exports` export interop for CommonJS module formatter.
  * `externalHelpers` option has been moved into the plugin `babel-plugin-external-helpers-2`.
  * Remove ability to use `enter`/`exit` catch-all handlers in plugins.
 * **New Feature**
  * Add plugin options.
  * Add callable class constructor.

## 5.8.26

 * **Internal**
  * Republish to get fix for runtime `typeof-react-element` helper.

## 5.8.25

 * **Internal**
  * Rename `define` method to avoid webpack assuming those files are AMD.

## 5.8.24

 * **Spec Compliancy**
  * Updated `optimisation.react.inlineElements` transformer to React 0.14 output. Thanks [@spicyj](https://github.com/spicyj)!
 * **Polish**
  * Add support for evaluating more static nodes. Thanks [@hzoo](https://github.com/hzoo)!

## 5.8.23

 * **Bug Fix**
  * Fix a bug where pushed scope bindings weren't properly being registered.

## 5.8.22

 * **Bug Fix**
  * Fix bug causing regexes to cause a syntax error after a block.
 * **Internal**
  * Expose `File`.

## 5.8.21

 * **New Feature**
  * Add support for Flow export types.
 * **Bug Fix**
  * Fix flow type annotations on object properties being lost.
  * Fix bug effecting nested arrow functions.
  * Check valid `export default` `function`/`class` token when parsing export default before converting to a declaration to avoid turning expressions into declarations.
 * **Polish**
  * Add an exception to non-existent bindings when checking if we need to wrap block scoping blocks in a closure.
  * Make comment retainment for multiple replacement nodes more predictable.
 * **Internal**
  * Remove `operator` property from `AssignmentPattern` nodes.
  * Update `es7.asyncFunctions` and `es7.objectRestSpread` to stage 2.

## 5.8.13-5.8.20

**The CHANGELOG was broken for these releases. Git tags were not pushed in the correct order and are therefore incorrect. It's recommended you NOT use any versions within this range.**

 * **New Feature**
  * Add `es6.spec.modules` transformer.
 * **Bug Fix**
  * Don't register export declarations as a module binding.
  * Register import bindings to the specifier instead of the declaration.
  * `export *` should not export `default`.
  * Clear `rawValue from JSX attribute values to avoid outputting the raw source verbatim.
  * Add support for boolean flow literals.
  * Fix bug where files that babel can compile weren't being written when ignored with the `--copy-files` flag.
  * Create new raw identifiers instead of cloning the original user one when exploding export specifiers to fix source map issues resulting in incorrect locations.
  * Break on hitting a terminator paren triggering character to avoid pushing multiple starting parens.
  * Consider comment starting character to be a terminatorless separator to avoid starting comments breaking terminatorless nodes.
 * **Internal**
  * Use `json5` for parsing `.babelrc` files and `JSON` for `package.json`.
  * Update Regenerator dependency to `0.8.35`.
  * Remove flow types from being scope tracked.
 * **Polish**
  * Only register export declarations in scope tracking if they're of a valid type.
  * Only output code frame and message on syntax errors in CLI.
  * Set decorated initialisers that have no `initialiser` to `undefined`.
  * Optimise common `typeof` cases in `es6.spec.symbols` transformer.

## 5.8.12

 * **Bug Fix**
  * Fix bug in lookahead causing decorators to be cleared.

## 5.8.11

 * **Bug Fix**
  * Check if module options are nully instead of falsy to allow empty strings as `moduleRoot` etc.
  * Fix bug where reassigning the rest parameter wouldn't result in a deoptimisation.

## 5.8.9

 * **Bug Fix**
  * Fix issue in parser where the flow plugin wasn't using state to refer to whether it as in a type or not causing lookaheads to cause breakages.

## 5.8.8

 * **Bug Fix**
  * Fix comments not being attached if they're touching the start of their node.

## 5.8.7

 * Never published, environment issues, again.

## 5.8.6

 * **Bug Fix**
  * Remove `rawValue` for JSX inner text.

## 5.8.5

 * **Polish**
  * Rewrite parentheses insertion for terminatorless nodes such as `BreakStatement` to be much more stable and cleaner.
  * Use `Object.setPrototypeOf` and fallback to `__proto__` in `inherits` helper.

## 5.8.2-5.8.4

Issues with publish process.

## 5.8.1

 * **Bug Fix**
  * Fix regression where async arrow functions couldn't have type annotation parameters.
  * Output type annotations of type instantiation parameters.
 * **Polish**
  * Prepend to highest loop when performing rest parameter allocation optimisation.
  * Add comment attachment to parser.
  * Add support for retaining inner comments of empty blocks.

## 5.8.0

 * Never released due to publish environment issues.

## 5.7.4

 * **Bug Fix**
  * Fix comments containg `@flow` being completely removed from output rather than just the specific directive.

## 5.7.3

 * **Bug Fix**
  * Add shim file for broken file path that old versions of the CLI would attempt to use.

## 5.7.2

 * **Bug Fix**
  * Fix performance issue in code generator when comment columns would attempt to match up in `compact` mode causing large amounts of whitespace.
  * Fix single line comments not outputting a newline in `compact` mode.
 * **Polish**
  * Add support for flow return types for arrow functions.

## 5.7.1

 * **Bug Fix**
  * Add back mistakenly removed `replaceWithSourceString` method.

## 5.7.0

 * **Bug Fix**
  * Deopt on spread elements when performing array destructuring unpack optimisation.
 * **New Feature**
  * Add `shouldPrintComment` option to control comment output.
  * Add `.babelignore` file to be consistent with other tools.
  * Allow `.babelrc` configs to be specified via `package.json`.
 * **Polish**
  * Don't ignore comments when using `compact: true` option.
  * Add support for Flow `import typeof`.
  * Fix incorrect inheritance method position when using loose mode classes and constructor isn't the first item.
 * **Internal**
  * Completely fork Acorn with `babylon`.
  * Rewrite build system to accommodate for multiple packages.

## 5.6.17

 * **Bug Fix**
  * Fix `CodeGenerator.findCommonStringDelimiter` causing a stack overflow.

## 5.6.16

 * **Internal**
  * Fix `recast` version to avoid pulling in a newer version.
 * **New Feature**
  * Add support for functions in `util.shouldIgnore`.
 * **Polish**
  * Strip flow directives in flow transformer.
  * Add a check for out of bounds default parameters, drastically improving performance and removes engine deoptimisations.
  * Various performance optimisations by [@samccone](https://github.com/samccone) 💅✨
  * Delay `this` assignment when referencing this inside an arrow function pre-bare super in derived class constructors.
  * Split up class body pushing if the constructor is in the wrong order.
 * **Bug Fix**
  * Fix hoisting of `ForInStatement` `init` variables in `system` module formatter.
  * `PathHoister`: Don't hoist to the same function as their original paths function parent.
  * `PathHoister`: Push each violation paths ancestry to the breakOnScopePaths collection to avoid constant hoisting to nested paths.fix tail call recursion on functions with less arguments than parameters.
  * Disallow `super.*` before `super()` in derived class constructors.
  * Properly regenerate scope for replaced nodes. Thanks [@loganfsmyth](https://github.com/loganfsmyth)!
  * Move up template literal simplification logic to avoid breaking on single elements.

## 5.6.13-5.6.15

 * Setting up automatic Travis releases.

## 5.6.12

 * **Bug Fix**
  * Fix finding parent for top-level shadowed functions.

## 5.6.11

 ** **Internal**
  * Merge `es6.parameters.rest` and `es6.parameters.default` transformers. See commit [c0fd4c1f9e0b18231f585c4fa793e4cb0e01aed1](https://github.com/babel/babel/commit/c0fd4c1f9e0b18231f585c4fa793e4cb0e01aed1) for more info.

## 5.6.10

 * **Bug Fix**
  * Fix faulty internal require check.
 * **Polish**
  * Add support for trailing commas in arrow function parameter lists.

## 5.6.8

 * **Bug Fix**
  * Fix binary expressions colliding with unary expression operators in compact mode.
  * Fix node properties being set to `null` when using computed properties.

## 5.6.7

 * **Bug Fix**
  * Fix hoisting of `ForXStatement` `left` `var`s when inserting a block scoping IIFE.
 * **Polish**
  * Combine all leading computed property initialisers into the root object in loose mode.
 * **Internal**
  * Deprecate returning of replacement strings from visitor methods.

## 5.6.6

 * **Bug Fix**
  * Fix weird parser bug where `void` type annotations were being parsed as keywords causing the tokeniser to lose track of context.

## 5.6.5

 * **Bug Fix**
  * Fix nested functions causing rest parameter optimisation to not properly detect when it should deopt on a reference.
 * **Internal**
  * Update Regenerator `0.8.31`.

## 5.6.4

 * **Internal**
  * Add `ParenthesizedExpression` node type.

## 5.6.3

 * **Bug Fix**
  * Fix rest parameter array allocation loop being incorrectly aliased.

## 5.6.2

 * **Bug Fix**
  * Fix method key literals not turning into computed member expression in loose mode.
  * Elect rest parameters in spread element position as candidates instead of replacing them in place.

## 5.6.0

 * **Bug Fix**
  * Fix istanbul interop for register hook when registering for non-existence extension.
  * Fix super class constructor call differing for no constructor in derived classes.
  * Disable module import receiver when in loose mode.
  * Fix duplicate filenames when using `babel` CLI when passing multiple matching patterns.
  * Register labels as bindings to fix undeclared variable checks.
 * **Polish**
  * Remove unnecessary string binary expressions when transforming template literals.
  * Support module live bindings in arbitary positions not in Program statement position.
  * Throw error when attemping to replace a `Program` root node with another node not of type `Program`.
  * Optimise rest parameters in spread element position and allocate rest array at the earliest common ancestor of all references.
  * Generate original number representation when value was not changed.
  * Check for invalid binding identifiers when generating inferred method names.
  * Don't terminate CLI when watching files fail compilation on init.
 * **New Feature**
  * Add new plugin API.
 * **Internal**
  * Split react displayName addition into a plugin.
  * Add check for `JSXMemberExpression` to `t.isReferenced`.
  * Move `validation.undeclaredVariableCheck` transformer up.
  * Start great core-to-plugin exodus.
  * Add `BindingIdentifier` virtual type.
  * Hidden class optimisations.
  * Array allocation optimisations.
  * Update `regenerator`.
  * Update `js-tokens`.
  * Sync with upstream Acorn.

## 5.5.8

 * **Internal**
  * Remove extremely unprofessional and harsh error message for those hotlinking to `resolve-rc`.

## 5.5.7

 * **Bug Fix**
  * Push newline after decorators when doing code gen.
  * Rewriting error handling to normalise options before merging them.
  * Remove duplicate keys in `alias-keys.json` causing errors in strict mode.
  * Fix `$ babel --help` not showing optional transformers as such.
 * **New Feature**
  * Add `auxiliaryCommentBefore` and `auxiliaryCommentAfter` options.

## 5.5.6

 * **Bug Fix**
  * Fix `let` binding collision in loop head not properly replacing `AssignmentExpression`s.

## 5.5.5

 * **Bug Fix**
  * Fix `file.opts` not being set before `file.log.deprecate` was called causing a `ReferenceError` as it was checking for a property on it.

## 5.5.4

 * **Bug Fix**
  * Add back missing `shouldIgnore` check.
  * Log message on deprecated options rather than throw an error.
  * Fix name of `auxiliaryComment` option when attempting Istanbul interop in `babel/register`.

## 5.5.3

 * **Bug Fix**
  * Fix weird state bug when traversing overa  `node` `ClassProperty` instead of `path` in the `es6.classes` transformer.

## 5.5.2

 * **Bug Fix**
  * Fix `NodePath#isPure` on `Property` nodes.
  * Use cwd instead of entry file directory when working out relative directory for `babel/register`.
 * **Internal**
  * Add scary warning for those few who choose to use the WIP experimental transformers.

## 5.5.1

 * **Bug Fix**
  * Remove `ClassProperty` nodes always in the `Flow` transformer. This is fine now since class properties aren't supported in any engine that supports classes but the `es7.classProperties` transformer will need to be updated in the future to desugar to ES6 classes instead of relying on the `es6.classes` transformer from being ran.

## 5.5.0

 * **Bug Fix**
  * Allow pushing declarations to `SwitchStatement`s.
  * Fix `minification.removeDebugger` to remove `DebuggerStatement`s rather than `ExpressionStatement`s with an identifier of `debugger`.
  * Check LHS in `ForInStatement` and `ForOfStatement` for constant violations.
  * Register function `id` as a reference when naming methods to avoid collisions.
  * Support key literals when checking for the existence of `displayName` property when attempting to add it for `React.createClass`.
  * Remove `ExportDefaultSpecifier` check from `t.isDefaultSpecifier`.
  * Don't consider `JSXIdentifier` HTML tag identifiers to be references.
 * **Polish**
  * Update `minification.deadCodeElimination` transformer to remove all statements after completion statements.
  * Update `minification.deadCodeElimination` transformer to not inline single used bindings that exist in different scopes.
  * When performing Istanbul interop in `babel/register`, add the auxiliary comment `"istanbul ignore text"` to get more accurate coverage.
  * Add `--nolazy` argument to `babel-node`.
  * Add support for `cluster` forking.
  * Perform scope tracking in a single pass instead of multiple.
  * Smarten up type inferrence and resolution to support the whole array of language constructs.
  * Optimise module metadata retrieval into a single pass.
  * Ignore trailing commas when inferring newlines.
  * Rename `minification.inlineExpressions` transformer to `minification.constantFolding`.
  * Check path relative to entry file when checking to see if we're inside `node_modules` when using `babel/register`.
  * Upgrade `regenerator`.

## 5.4.7

 * **Bug Fix**
  * Don't consider `JSXAttribute` `names` to be valid `ReferencedIdentifier`s.

## 5.4.6

 * **Bug Fix**
  * Fix `spec.functionName` transformer incorrectly attempting to rename a binding that doesn't exist as it's a global.
 * **Internal**
  * Deprecate custom module formatters.

## 5.4.5

 * **Bug Fix**
  * Add `JSXIdentifier` as a valid `ReferencedIdentifier` visitor virtual type.
  * Ignore `CallExpression` `_prettyCall` when the `retainLines` option is enabled.
  * Inherit comments to new declaration node when exploding module declarations.
  * Fix `es6.tailCall` transformer failing on calls that exceed the max parameters of the function.

## 5.4.4

 * **Bug Fix**
  * Fix bug where replacing variable declarations in the head of a `for` loop would turn them into `ExpressionStatement`s.
  * Fix renaming of assignment expressions that were non-identifiers ie. patterns.
  * Force space before `class` `id` to avoid breaking named classes when using `compact` mode.
  * Add assignment pattern explosion to avoid initial duplicate nodes.
  * Ignore this and arguments when performing TCO on shadowed functions.
 * **Polish**
  * Rename `sourceMapName` option to `sourceMapTarget`. Thanks [@getify](https://github.com/getify)!
  * Better detection of completion records, ignore those in `Function`s.
  * Clarified descriptions of the options that are enabled by default.
  * Resolve `\`babel-plugin-${name}\`` plugin names **before** just checking the `name`. Thanks [@jquense](https://github.com/jquense)!
  * Update AMD module formatter to add import default remapping.

## 5.4.3

 * **Bug Fix**
  * Fix `module` being incorrectly rewritten when used as in an export declaration.
  * When performing single-reference inlining, ensure that the single reference isn't a child of the binding itself.
  * Fix a bug in `minification.deadCodeElimination` where a new binding instance was being created for local class bindings instead of just inheriting the parent one.
  * Fix bug with paren printing in `compact` and `retainLines` mode where a left paren was already printed before catching up.
 * **Internal**
  * Handle contexts for paths much better. This will ensure that the path node location info is in sync.

## 5.4.2

 * **Polish**
  * `ignore` and `only` patterns are now **very** liberal. The pattern can now exist anywhere in the path.

## 5.4.1

 * **Bug Fix**
  * Add missing `slash` dependency. Thanks [@browncolyn](https://github.com/browncolyn)!
 * **Polish**
  * Clean up `shouldIgnore` algorithm to work how you'd expect rather than being a hacky piece of shit. It now crawls the entire path, checking each section of it against the input ignore/only patterns. This means that the pattern `foo` will ignore the paths `foo/bar.js`, `bar/foo` etc.

## 5.4.0

 * **New Feature**
  * Added [function bind syntax](https://github.com/zenparsing/es-function-bind) behind stage 0. Thanks [@RReverser](https://github.com/rreverser)!
  * Added `env` option. Especially handy when using the `.babelrc`.
 * **Bug Fix**
  * Fix files not properly being ignored when `babel.transform` ignores them when using `$ babel`.
  * Fix scope tracking registering loop head bindings to their `VariableDeclaration` instead of `VariableDeclarator`.
 * **Polish**
  * Normalise path separators for souce map paths when using `$ babel`.
  * Rework `PathHoister` to ignore global references and to not deopt on reassignments to referenced bindings, instead it tries to hoist to the highest scope.
  * Added missing exponential operator inlining. Thanks [@nkt](https://github.com/nkt)!
  * Optimise `regenerator` transformer. Thanks [@benjamn](https://github.com/benjamn)!

## 5.3.3

 * **Bug Fix**
  * Fix `minification.deadCodeElimination` transformer incorrectly trying to inline import declarations.
  * Fix `minification.inlineExpression` transformer getting into an infinite loop.

## 5.3.2

 * **Bug Fix**
  * Fix patterns not being considered when hoisting variables in the `es6.blockScoping` transformer.

## 5.3.1

 * **Bug Fix**
  * Fix unique export specifiers not being cloned when exploding class and function exports,
 * **Polish**
  * Turn import remaps to sequence expressions to remove their context and improve performance.

## 5.3.0

**Speeeeeeed**

![gifs lol](https://31.media.tumblr.com/568205a0e37ae15eca510fa639589a59/tumblr_n8kw8kpcSb1sg6cg8o1_500.gif)

 * **Spec Compliancy**
  * Allow trailing param commas for methods when using the `es7.trailingCommas` transformer.
 * **Bug Fix**
  * Fix `es6.blockScoping` transformer not properly ignoring `break` in `SwitchCase`.
  * Fix lookahead context saving to avoid weird tokenizer state.
  * Explode duplicate identifiers in export/import specifiers and property shorthand to create unique objects.
  * Skip loose mode for class methods when they have decorators.
  * When removing nodes, share their comments with their siblings.
  * Properly hoist temp param declarations when doing TCO.
 * **Internal**
  * Add `--harmony_generators` flag to `$ babel-node`.
  * Internal AST traversals have been minimised **drastically**. Transformers have been grouped together which means entire tree traversals are much fewer. Visiting nodes is now also skipped if the traversal context can detect that the handler is a noop. This sames precious cycles as it avoids constructing traversal paths and creating a new traversal context. See issues [#1472](https://github.com/babel/babel/issues/1472) and [#1486](https://github.com/babel/babel/issues/1486) for related discussion.
 * **Polish**
  * Move many `utility` transformers to `minification`.

## 5.2.17

 * **Bug Fix**
  * Fix auxiliary comments not properly being attached to function declaration helpers.
  * Add `Super` node type to `ast-types` patch.
  * Ignore parameter bindings when attempting to inline them in the `minification.deadCodeElimination` transformer.
  * Correct `extensions` arguments when using the Babel CLI.

## 5.2.16

 * **Bug Fix**
  * Fix plugins being disabled when using the whitelist.
  * Fix correct function scope being passed to `nameMethod.property` when inferring the function name for class methods.
  * Fix incorrect extensions reference causing weird issues when using the Babel CLI.
  * Fix destructuring param reference replacements not inheriting from their original param.
 * **Spec Compliancy**
  * Fix order that method decorators are ran in.

## 5.2.15

 * **Bug Fix**
  * Fix initializer descriptor add attempt if it doesn't exist.

## 5.2.14

 * **Bug Fix**
  * Fix bug with initializer decorators where the descriptors weren't being defined if there was no `initializer` property.
 * **Internal**
  * Expose `retainLines` option to CLI.
  * Fix `retainLines` option not being taken into consideration when doing multiple variable declaration declarators generation.
  * Expose minified and unminified copies of dist scripts.

## 5.2.13

 * **Bug Fix**
  * Fix `ExportDeclaration`s being incorrectly removed when using the `utility.deadCodeElimination` transformer.
  * Fix position of `utility` transformers.
 * **New Feature**
  * Add built-in `esquery` support.
 * **Internal**
  * Consolidate notion of "virtual types".

## 5.2.12

 * **Polish**
  * Make UID generation based on module declarations **much** nicer.
 * **Internal**
  * Remove internal check for traversal path replacement of self. This is a pattern that **could** come up in the wild and it could lead to pretty nasty code and may lead to internal regressions as the test coverage isn't 100% :( Instead, just put it in the fast path.

## 5.2.11

 * **Internal**
  * Rename `getModuleName` option to `getModuleId`, doh.

## 5.2.10

 * **Bug Fix**
  * Fix numerous issues in `replaceWithSourceString`. Thanks [@pangratz](https://github.com/pangratz)!
 * **New Feature**
  * Add `getModuleName` option. Thanks [@jayphelps](https://github.com/jayphelps)!

## 5.2.9

 * **Bug Fix**
  * Fix `_blockHoist` transformer incorrectly sorting nodes on shitty environments that aren't spec compliant in their key order.
  * Fix broken `parse` API method reference to an undeclared import.

## 5.2.7

 * **Bug Fix**
  * Move `utility.deadCodeElimination` transformer up to avoid race conditions.
  * Fix shorthand property scope binding renaming.
 * **Polish**
  * Turn helper variable declarations into function declarations if possible.
 * **Internal**
  * Removed native inheritance support from classes.
  * Added `replaceWithSourceString` path API.
  * Split up `es3.propertyLiterals` and `es3.memberExpressionLiterals` transformers to `minfication.propertyLiterals` and `es3.memberExpressionLiterals`.

## 5.2.6

 * **Internal**
  * Fix transformer aliases being accidently set as deprecated ones.
  * Expose `Pipeline` as `TransformerPipeline` instead.

## 5.2.5

 * **Bug Fix**
  * Fix `parse` API not adding all the correct pipeline transformers.

## 5.2.4

 * **Bug Fix**
  * Fix race condition with the Node API being loaded awkwardly and not being able to initialise itself when used in the browser.
 * **Internal**
  * Expose `transform.pipeline`.

## 5.2.3

 * **Bug Fix**
  * Fix plugin containers being called with an undefined import. Thanks [@timbur](https://github.com/timbur)!
  * Allow Flow object separators to be commas. Thanks [@monsanto](https://github.com/monsanto)!
  * Add missing `Statement` and `Declaration` node aliases to flow types.

## 5.2.2

 * **Internal**
  * Allow `util.arrayify` to take arbitrary types and coerce it into an array.

## 5.2.1

 * **Bug Fix**
  * Fix regression in `node/register` that caused `node_modules` to not be ignored.

## 5.2.0

 * **Bug Fix**
  * Fix plugin strings splitting arbitrarily on `:` which caused full paths on Windows to fail as they include `:` after the drive letter.
  * Call class property `initializer`s with their target instead of their descriptor.
  * Fix `ignore` and `only` not properly working on Windows path separators. Thanks [@stagas](https://github.com/stagas)!
  * Fix `resolveRc` running on files twice causing issues. Thanks [@lukescott](https://github.com/lukescott)!
  * Fix shorthand properties not correctly being target for `isReferenced` checks. Thanks [@monsanto](https://github.com/monsanto)!
 * **Polish**
  * Allow passing an array of globs to `babel/register` `only` and `ignore` options. Thanks [@Mark-Simulacrum](https://github.com/Mark-Simulacrum)!
  * When inferring function names that collide with upper bindings, instead of doing the wrapper, instead rename them.
  * Consider constant-like variable declaration functions to always refer to themselves so TOC can be performed.
  * Process globs manually when using `$ babel` as some shells such as Windows don't explode them. Thanks [@jden](https://github.com/jden)!
  * Add alternative way to execute plugins via a closure that's called with the current Babel instance.
 * **Internal**
  * Remove multiple internal transformers in favor of directly doing things when we need to. Previously, declarations such as `_ref` that we needed to create in specific scopes were done at the very end via the `_declarations` transformer. Now, they're done and added to the scope **right** when they're needed. This gets rid of the crappy `_declarations` property on scope nodes and fixes the crappy regenerator bug where it was creating a new `BlockStatement` so the declarations were being lost.
  * Rework transformer traversal optimisation. Turns out that calling a `check` function for **every single node** in the AST is ridiculously expensive. 300,000 nodes timesed by ~30 transformers meant that it took tens of seconds to perform while it's quicker to just do the unnecessary traversal. Seems obvious in hindsight.
 * **New Feature**
  * Add `jscript` transformer that turns named function expressions into function declarations to get around [JScript's horribly broken function expression semantics](https://kangax.github.io/nfe/#jscript-bugs). Thanks [@kondi](https://github.com/kondi)!
  * Add `@@hasInstance` support to objects when using the `es6.spec.symbols` transformer.
  * Add `retainLines` option that retains the line (but not the columns!) of the input code.

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
