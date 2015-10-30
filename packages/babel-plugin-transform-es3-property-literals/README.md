# babel-plugin-transform-es3-property-literals

Ensure that reserved words are quoted in object property keys

## Installation

```sh
$ npm install babel-plugin-transform-es3-property-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es3-property-literals"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es3-property-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es3-property-literals"]
});
```
