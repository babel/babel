# babel-plugin-transform-es2015-shorthand-properties

Compile ES2015 shorthand properties to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-shorthand-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-shorthand-properties"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-shorthand-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-shorthand-properties"]
});
```
