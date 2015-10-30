# babel-plugin-syntax-async-generators

Allow parsing of async generator functions.

## Installation

```sh
$ npm install babel-plugin-syntax-async-generators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-async-generators"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-async-generators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-async-generators"]
});
```
