# babel-plugin-transform-flow-strip-types

Strip flow type annotations from your output code.

## Installation

```sh
$ npm install babel-plugin-transform-flow-strip-types
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-flow-strip-types"]
}
```

### Via CLI

```sh
$ babel --plugins transform-flow-strip-types script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-flow-strip-types"]
});
```
