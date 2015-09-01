# babel-plugin-flow-strip-types

Strip flow type annotations from your output code.

## Installation

```sh
$ npm install babel-plugin-flow-strip-types
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["flow-strip-types"]
}
```

### Via CLI

```sh
$ babel --plugins flow-strip-types script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["flow-strip-types"]
});
```
