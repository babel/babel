# @babel/plugin-syntax-decorators

> Allow parsing of decorators.

## Installation

```sh
npm install --save-dev @babel/plugin-syntax-decorators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-syntax-decorators"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-syntax-decorators script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-syntax-decorators"]
});
```

## Options

### `legacy`

`boolean`, defaults to `false`.

Use the legacy (stage 1) decorators syntax.

### `decoratorsBeforeExport`

`boolean`, defaults to `true`.

```js
// decoratorsBeforeExport: true
@decorator
export class Foo {}

// decoratorsBeforeExport: false
export @decorator class Bar {}
```

This option allows developers to experimet both the possible syntaxes. This will
allow collecting an informed feedback from the community, which will help to
decide which the final syntax should be.
[tc39/proposal-decorators#69](https://github.com/tc39/proposal-decorators/issues/69)
