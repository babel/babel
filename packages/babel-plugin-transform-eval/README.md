# @babel/plugin-transform-eval

> This plugin allows Babel to compile eval calls with string literals.

## Example

**In**

```javascript
eval("(() => 'foo')");
```

**Out**

```javascript
eval("(function () { return 'foo'; })");
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-eval
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-eval"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-eval script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-eval"]
});
```
