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
