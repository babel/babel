# babel-plugin-transform-es2015-modules-systemjs

## Installation

```sh
$ npm install babel-plugin-transform-es2015-modules-systemjs
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-modules-systemjs"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-modules-systemjs script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-modules-systemjs"]
});
```
