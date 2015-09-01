# babel-plugin-es2015-computed-properties

Compile ES2015 computed properties to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-computed-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-computed-properties"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-computed-properties script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-computed-properties"]
});
```
