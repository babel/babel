# @babel/plugin-transform-destructuring

> Compile ES2015 destructuring to ES5

## Examples

**In**

```javascript
let arr = [1,2,3];
let {x, y, z} = arr;
```

**Out**

```javascript
var arr = [1, 2, 3];
var x = arr.x,
    y = arr.y,
    z = arr.z;
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-destructuring
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-destructuring"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-destructuring script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-destructuring"]
});
```
