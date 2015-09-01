# babel-plugin-async-to-generator

Turn async functions into ES2015 generators

## Installation

```sh
$ npm install babel-plugin-async-to-generator
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["async-to-generator"]
}
```

### Via CLI

```sh
$ babel --plugins async-to-generator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["async-to-generator"]
});
```
