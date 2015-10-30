# babel-plugin-syntax-async-functions

Allow parsing of async functions.

## Installation

```sh
$ npm install babel-plugin-syntax-async-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-async-functions"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-async-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-async-functions"]
});
```
