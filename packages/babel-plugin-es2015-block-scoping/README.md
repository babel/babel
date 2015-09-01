# babel-plugin-es2015-block-scoping

Compile ES2015 block scoping (const and let) to ES5

## Installation

```sh
$ npm install babel-plugin-es2015-block-scoping
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-block-scoping"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-block-scoping script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-block-scoping"]
});
```
