# @babel/eslint-plugin

Companion rules for `@babel/eslint-parser`. `@babel/eslint-parser` does a great job at adapting `eslint`
for use with Babel, but it can't change the built-in rules to support experimental features.
`@babel/eslint-plugin` re-implements problematic rules so they do not give false positives or negatives.

> Requires Node 10.13 or greater

### Install

```sh
npm install @babel/eslint-plugin --save-dev
```

Load the plugin in your `.eslintrc.json` file:

```json
{
  "plugins": ["@babel"]
}
```

Finally enable all the rules you would like to use (remember to disable the
original ones as well!).

```json
{
  "rules": {
    "@babel/new-cap": "error",
    "@babel/no-invalid-this": "error",
    "@babel/no-unused-expressions": "error",
    "@babel/object-curly-spacing": "error",
    "@babel/semi": "error"
  }
}
```

### Rules

Each rule corresponds to a core `eslint` rule and has the same options.

🛠: means it's autofixable with `--fix`.

- `@babel/new-cap`: handles decorators (`@Decorator`)
- `@babel/no-invalid-this`: handles class fields and private class methods (`class A { a = this.b; }`)
- `@babel/no-unused-expressions`: handles `do` expressions
- `@babel/object-curly-spacing`: handles `export * as x from "mod";` (🛠)
- `@babel/semi`: Handles class properties (🛠)
