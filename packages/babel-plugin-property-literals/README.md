# babel-plugin-property-literals

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
$ npm install babel-plugin-property-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["property-literals"]
}
```

### Via CLI

```sh
$ babel --plugins property-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["property-literals"]
});
```
