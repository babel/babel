# babel-plugin-es2015-arrow-functions

Compile ES2015 arrow functions to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-arrow-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-arrow-functions"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-arrow-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-arrow-functions"]
});
```
