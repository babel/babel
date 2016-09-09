# babel-plugin-transform-object-rest-spread

Compile object rest and spread to ES5

```js
// source
z = { x, ...y };

// compiled
_extends = Object.assign || function(target) { ... }
z = _extends({ x }, y);
```

## Installation

```sh
$ npm install babel-plugin-transform-object-rest-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-object-rest-spread"]
}
```

## Options

This plugin will use babel's `extends` helper, which will polyfill `Object.assign` by default.

* `useBuiltIns` - Do not use Babel's helper's and just transform to use the built-in method (Disabled by default).

```js
{
  "plugins": [
    ["transform-object-rest-spread", { "useBuiltIns": true }]
  ]
}

// source
z = { x, ...y };
// compiled
z = Object.assign({ x }, y);
```

### Via CLI

```sh
$ babel --plugins transform-object-rest-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-rest-spread"]
});
```
