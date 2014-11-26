# 1.14.3

 * Add playground pretzel maps.

# 1.14.2

 * Fix `commonInterop` default export handling.
 * Fix keyworded property key identifiers being turned into computed property key literals.

# 1.14.1

 * Inherit comments from `ClassDeclaration`.

# 1.14.0

 * Add [playground](https://6to5.github.io/playground.html).

# 1.13.13

 * Fix `--debug` in `bin/6to5-node`. Thanks [@timoxley](https://github.com/timoxley).

# 1.13.12

 * Ignore `XJSEmptyExpression`s in `react` transformer output.

# 1.13.11

 * Fix `util.regexify` on falsy values.
 * Fix `_aliasFunction` with rest parameters.
 * Export as `module.exports` instead of `exports.default` if there are no other `ExportDeclaration`s in `commonInterop` module formatter.
 * Add `system` module formatter. Thanks [@douglasduteil](https://github.com/douglasduteil).

# 1.13.10

 * Add support for `AssignmentExpression` destructuring outside of `ExpressionStatement`.

# 1.13.9

 * Fix `VirtualPropertyExpression` visitor keys.

# 1.13.8

 * Only use a single reference in abstract references.

# 1.13.7

 * Upgrade `acorn-6to5`.
 * Add experimental exponentiation operator support.

# 1.13.6

 * Fix experimental object spread/rest helper.

# 1.13.5

 * Upgrade `acorn-6to5`.
 * Add experimental support for object spread/rest.
 * Change `arguments` to array to an additional helper method.

# 1.13.4

 * Fix single spread element returning itself.

# 1.13.3

 * Upgrade `acorn-6to5`.
 * Add experimental support for abstract references.

# 1.13.2

 * Optimise `Array.from` usage by adding a helper method.
 * Upgrade `acorn-6to5`.

# 1.13.1

 * Fix constructor spread optimisation. Thanks [@zloirock](https://github.com/zloirock).

# 1.13.0

 * Put experimental ES7 features behind a flag `--experimental` and `experimental` option.
 * Constructor spread performance increase. Thanks [@RReverser](https://github.com/RReverser).
 * Use `self` instead of `window` in the optional 6to5 runtime. Thanks [@RReverser](https://github.com/RReverser).

# 1.12.26

 * Support computed property destructuring.

# 1.12.25

 * Update `acorn-6to5`, `ast-types`, `es6-shim`, `chokidar`, `estraverse` and `private`.

# 1.12.24

 * Collect references that haven't been declared in scope.

# 1.12.23

 * Fix generator function export hoisting.

# 1.12.22

 * Update `fs-readdir-recursive` and `chokidar`.
 * Support array destructuring on iterables.
 * Make amd module id optional. Thanks [@webpro](https://github.com/webpro).

# 1.12.21

 * Fix unneccesary let scoping replacement.
 * Add `commonInterop` module formatter. Thanks [@Naddiseo](https://github.com/Naddiseo).
 * Fix `return` outside of function body bug. Thanks [@brentburg](https://github.com/brentburg).
 * Add more flexible option types.

# 1.12.20

 * Append `sourceMappingURL` when using `bin/6to5` and output sourcemaps.

# 1.12.19

 * Add `comments` option and `--remove-comments` flag. Thanks [@webpro](htps://github.com/webpro).
 * Embed `regenerator`.

# 1.12.18

 * Use `global` reference instead of `window`.

# 1.12.17

 * Add `moduleName`, `sourceRoot` and `filenameRelative` options. Thanks [@darvelo](https://github.com/darvelo).
 * Traversal optimisations.

# 1.12.16

 * Fix comments not being retained from `MethodDefinition` in classes.
 * Add temporal dead zone in default parameters.

# 1.12.15

 * Update `acorn-6to5`.

# 1.12.14

 * Fix duplicate let scoping in functions.
 * Make JSX whitespace more React-compliant.
 * Add `_memberExpressionKeywords` transformer that turns keyword identifiers to computed literals.
 * Upgrade `regenerator-6to5`.

# 1.12.13

 * Support duplicate constants within different block scopes.
 * Fix for-head duplication testing and replacement.
 * Support `raw` property on tagged template literals.

# 1.12.12

 * Make scope tracker more reliable to handle all edgecases.

# 1.12.11

 * Block scope classes.
 * Fix generation of integer `Literal`s in `MemberExpression`.

# 1.12.10

 * Fix let scoping var hoisting.

# 1.12.9

 * Escape unicode characters when generating string `Literal`s.
 * Fix semicolons being output for statements in `ExportDeclaration`.
 * Fix `WithStatement` missing parenthesis.

# 1.12.8

 * Temporarily forbid `AssignmentExpression` destructuring outside of `ExpressionStatement`.

# 1.12.7

 * Update to latest `acorn-6to5`.

# 1.12.6

 * Update to latest `acorn-6to5`.

# 1.12.5

 * Fix excessive whitespace trimming resulting in innaccurate sourcemap line.

# 1.12.4

 * Add `doc` folder for documentation.

# 1.12.3

 * Support generator comprehensions.
 * Use `Array.from` instead of `Array.prototype.slice` in spread transformer.
 * Support spread in `NewExpression`s.

# 1.12.2

 * Upgrade `matcha` to `0.6.0` and `browserify` to `6.3.2`.
 * Add own `trimRight` helper instead of relying on the string instance method.
 * Support JSX spreads that aren't the first.

# 1.12.1

 * Fix `this` and `arguments` mapping in the `_aliasFunctions` transformer.

# 1.12.0

 * Combine `jsx` and `react` transformers to `react`.
 * Update `react` syntax output to React v0.12.

# 1.11.15

 * Fix JSX literal whitespace generation.

# 1.11.14

 * Avoid using a switch for let-scoping continue and break statements and use an if statement instead.
 * Remove excess whitespace and newlines from JSX literals.

# 1.11.13

 * Update regenerator-6to5
 * Add support for most escodegen formatting options
