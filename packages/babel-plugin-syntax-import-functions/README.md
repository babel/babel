# babel-plugin-syntax-import-functions

Allow parsing of `import()`.

## Installation

```sh
$ npm install babel-plugin-syntax-import-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["syntax-import-functions"]
}
```

### Via CLI

```sh
$ babel --plugins syntax-import-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["syntax-import-functions"]
});
```
