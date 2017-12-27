# @babel/plugin-transform-object-set-prototype-of-to-assign

> This plugin will transform all `Object.setPrototypeOf` calls to a method that will do a shallow defaults of all properties.

**NOTE:** There are some caveats when using this plugin, see the [`@babel/plugin-transform-proto-to-assign` README](https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-proto-to-assign) for more information.

## Example

**In**

```javascript
Object.setPrototypeOf(bar, foo);
```

**Out**

```javascript
var _defaults = ...;

_defaults(bar, foo);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-object-set-prototype-of-to-assign
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-object-set-prototype-of-to-assign"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-object-set-prototype-of-to-assign script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-object-set-prototype-of-to-assign"]
});
```
