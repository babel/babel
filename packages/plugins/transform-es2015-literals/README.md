# babel-plugin-transform-es2015-literals

Compile ES2015 unicode string and number literals to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-literals"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-literals"]
});
```
