# babel-plugin-es2015-sticky-regex

Compile ES2015 sticky regex to an ES5 RegExp constructor

## Installation

```sh
$ npm install babel-plugin-es2015-sticky-regex
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-sticky-regex"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-sticky-regex script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-sticky-regex"]
});
```
