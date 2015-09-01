# babel-plugin-es2015-shorthand-properties

Compile ES2015 shorthand properties to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-shorthand-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-shorthand-properties"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-shorthand-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-shorthand-properties"]
});
```
