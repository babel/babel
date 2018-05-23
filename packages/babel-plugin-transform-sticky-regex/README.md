# @babel/plugin-transform-sticky-regex

> Compile ES2015 sticky regex to an ES5 RegExp constructor

## Examples

**In**

```javascript
const a = /o+/y;
```

**Out**

```javascript
var a = new RegExp("o+", "y");
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-sticky-regex
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-sticky-regex"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-sticky-regex script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-sticky-regex"]
});
```
