# babel-plugin-transform-es2015-computed-properties

Compile ES2015 computed properties to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-computed-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-computed-properties"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-computed-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-computed-properties"]
});
```
