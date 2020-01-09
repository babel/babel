# @babel/eslint-plugin

Companion rules for `@babel/eslint-parser`. `@babel/eslint-parser` does a great job at adapting `eslint`
for use with Babel, but it can't change the built in rules to support experimental features.
`@babel/eslint-plugin` re-implements problematic rules so they do not give false positives or negatives.

> Requires Node 10.9 or greater

### Install

```sh
npm install @babel/eslint-plugin --save-dev
```

Load the plugin in your `.eslintrc.json` file:

```json
{
  "plugins": ["@babel/eslint-plugin"]
}
```

Finally enable all the rules you would like to use (remember to disable the
original ones as well!).

```json
{
  "rules": {
    "babel/camelcase": "error",
    "babel/new-cap": "error",
    "babel/no-invalid-this": "error",
    "babel/no-unused-expressions": "error",
    "babel/object-curly-spacing": "error",
    "babel/semi": "error",
  }
}
```
### Rules

Each rule corresponds to a core `eslint` rule, and has the same options.

🛠: means it's autofixable with `--fix`.

- `babel/camelcase: doesn't complain about optional chaining (`var foo = bar?.a_b;`)
- `babel/new-cap`: Ignores capitalized decorators (`@Decorator`)
- `babel/no-invalid-this`: doesn't fail when inside class properties (`class A { a = this.b; }`)
- `babel/no-unused-expressions`: doesn't fail when using `do` expressions or [optional chaining](https://github.com/tc39/proposal-optional-chaining) (`a?.b()`).
- `babel/object-curly-spacing`: doesn't complain about `export x from "mod";` or `export * as x from "mod";` (🛠)
- `babel/semi`: doesn't fail when using `for await (let something of {})`. Includes class properties (🛠)
