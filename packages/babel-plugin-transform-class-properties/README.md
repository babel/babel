# babel-plugin-transform-class-properties

## Installation

```sh
$ npm install babel-plugin-transform-class-properties
```

### Options: `spec`

- Class properties are compiled to use `Object.defineProperty`
- Static fields are now defined even if they are not initialized

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
// without options
{
  "plugins": ["transform-class-properties"]
}

// with options
{
  "plugins": [
    ["transform-class-properties", { "spec": true }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-class-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-properties"]
});
```
