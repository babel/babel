# babel-plugin-transform-object-assign

Replace `Object.assign` with an inline helper.

## Example

**In**

```javascript
Object.assign(a, b);
```

**Out**

```javascript
var _extends = ...;

_extends(a, b);
```

## Installation

```sh
$ npm install babel-plugin-transform-object-assign
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-object-assign"]
}
```

### Via CLI

```sh
$ babel --plugins transform-object-assign script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-object-assign"]
});
```
