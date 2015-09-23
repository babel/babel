# babel-plugin-transform-property-literals

Turn valid property key literals to plain identifiers

## Example

**In**

```javascript
var obj = {
  "foo": "isValid",
  var: "isKeyword",
  "const": "isKeyword"
};
```

**Out**

```javascript
var obj = {
  foo: "isValid",
  "var": "isKeyword",
  "const": "isKeyword"
};
```

## Installation

```sh
$ npm install babel-plugin-transform-property-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-property-literals"]
}
```

### Via CLI

```sh
$ babel --plugins transform-property-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-property-literals"]
});
```
