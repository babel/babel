# Changelog

Gaps between patch versions are faulty/broken releases.

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

 * Optimise `Array.from` usage by adding a helper method.
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
