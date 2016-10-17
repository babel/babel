# babel-plugin-undeclared-variables-check

> Deprecated: use ESLint or another linter for this use case and more.
> For ESLint you can use the [`no-undef` rule](http://eslint.org/docs/rules/no-undef)

Throw a compile-time error on references to undeclared variables

## Installation

```sh
$ npm install babel-plugin-undeclared-variables-check
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["undeclared-variables-check"]
}
```

### Via CLI

```sh
$ babel --plugins undeclared-variables-check script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["undeclared-variables-check"]
});
```
