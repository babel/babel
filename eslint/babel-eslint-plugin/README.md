# eslint-plugin-babel

An eslint plugin companion to babel-eslint. babel-eslint does a great job of adapting eslint for use with Babel, but to it can't change the built in rules to support experimental features. eslint-plugin-babel reimplements problematic rules so they do not give false positives or negatives.

### Install

```sh
npm install eslint-plugin-babel -S
```

enable the plugin by adjusting your `.eslintrc` file to include the plugin:

```json
{
  "plugins": [
    "babel"
  ]
}
```

Finally enable all the rules you like to use (remember to disable the originals as well!).

```json
{
  "rules": {
    "babel/generator-star-spacing": 1,
    "babel/new-cap": 1,
    "babel/object-curly-spacing": 1,
    "babel/object-shorthand": 1,
    "babel/arrow-parens": 1
  }
}
```
### Rules

Each rule cooresponds to a core eslint rule, and has the same options.

- `babel/generator-star-spacing`: Handles async/await functions correctly
- `babel/new-cap`: Ignores capitalized decorators (`@Decorator`)
- `babel/object-curly-spacing`: doesn't complain about `export x from "mod";` or `export * as x from "mod";`
- `babel/object-shorthand`: doesn't fail when using object spread (`...obj`)
- `babel/arrow-parens`: Handles async functions correctly