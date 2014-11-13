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
