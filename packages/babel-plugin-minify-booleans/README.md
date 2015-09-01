# babel-plugin-minify-booleans

Turn boolean literals into !0 for true and !1 for false.

## Installation

```sh
$ npm install babel-plugin-minify-booleans
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-booleans"]
}
```

### Via CLI

```sh
$ babel --plugins minify-booleans script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-booleans"]
});
```
