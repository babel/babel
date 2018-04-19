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
