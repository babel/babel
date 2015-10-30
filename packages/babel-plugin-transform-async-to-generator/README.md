# babel-plugin-transform-async-to-generator

Turn async functions into ES2015 generators

## Installation

```sh
$ npm install babel-plugin-transform-async-to-generator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-async-to-generator"]
}
```

### Via CLI

```sh
$ babel --plugins transform-async-to-generator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-to-generator"]
});
```
