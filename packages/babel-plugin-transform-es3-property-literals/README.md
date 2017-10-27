# @babel/plugin-transform-es3-property-literals

> Ensure that reserved words are quoted in object property keys

## Example

**In**

```javascript
var foo = {
  catch: function () {}
};
```

**Out**

```javascript
var foo = {
  "catch": function () {}
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-es3-property-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-es3-property-literals"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-es3-property-literals script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-es3-property-literals"]
});
```
