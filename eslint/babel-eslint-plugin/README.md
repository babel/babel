# eslint-plugin-babel

An `eslint` plugin companion to `babel-eslint`. `babel-eslint` does a great job at adapting `eslint` for use with Babel, but it can't change the built in rules to support experimental features. `eslint-plugin-babel` reimplements problematic rules so they do not give false positives or negatives.

### Install

```sh
npm install eslint-plugin-babel -D
```

Load the plugin in your `.eslintrc` file:

```json
{
  "plugins": [
    "babel"
  ]
}
```

Finally enable all the rules you would like to use (remember to disable the
original ones as well!).

```json
{
  "rules": {
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-curly-spacing": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1,
    "babel/no-await-in-loop": 1
  }
}
```
### Rules

Each rule corresponds to a core `eslint` rule, and has the same options.

- `babel/generator-star-spacing`: Handles async/await functions correctly
- `babel/new-cap`: Ignores capitalized decorators (`@Decorator`)
- `babel/object-curly-spacing`: doesn't complain about `export x from "mod";` or `export * as x from "mod";`
- `babel/object-shorthand`: doesn't fail when using object spread (`...obj`)
- `babel/arrow-parens`: Handles async functions correctly
- `bael/no-await-in-loop`: guard against awaiting async functions inside of a loop
