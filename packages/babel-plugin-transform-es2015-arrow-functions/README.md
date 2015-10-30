# babel-plugin-transform-es2015-arrow-functions

Compile ES2015 arrow functions to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-arrow-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-arrow-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-arrow-functions"]
});
```
