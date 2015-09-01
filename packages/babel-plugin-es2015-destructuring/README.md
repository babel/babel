# babel-plugin-es2015-destructuring

Compile ES2015 destructuring to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-destructuring
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-destructuring"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-destructuring script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-destructuring"]
});
```
