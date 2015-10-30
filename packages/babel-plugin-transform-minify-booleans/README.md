# babel-plugin-transform-minify-booleans

Turn boolean literals into !0 for true and !1 for false.

## Installation

```sh
$ npm install babel-plugin-transform-minify-booleans
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-minify-booleans"]
}
```

### Via CLI

```sh
$ babel --plugins transform-minify-booleans script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-minify-booleans"]
});
```
