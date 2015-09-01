# babel-plugin-es2015-spread

Compile ES2015 spread to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-spread
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-spread"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-spread script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-spread"]
});
```
