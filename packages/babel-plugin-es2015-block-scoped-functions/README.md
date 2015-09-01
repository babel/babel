# babel-plugin-es2015-block-scoped-functions

Babel plugin to ensure function declarations at the block level are block scoped.

## Installation

```sh
$ npm install babel-plugin-es2015-block-scoped-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es2015-block-scoped-functions"]
}
```

### Via CLI

```sh
$ babel --plugins es2015-block-scoped-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es2015-block-scoped-functions"]
});
```
