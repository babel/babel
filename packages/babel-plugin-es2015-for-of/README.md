# babel-plugin-es2015-for-of

Compile ES2015 for...of to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-for-of
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-for-of"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-for-of script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-for-of"]
});
```
