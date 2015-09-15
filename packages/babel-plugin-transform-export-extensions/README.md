# babel-plugin-transform-export-extensions

Compile export extensions to ES2015

## Installation

```sh
$ npm install babel-plugin-transform-export-extensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-export-extensions"]
}
```

### Via CLI

```sh
$ babel --plugins transform-export-extensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-export-extensions"]
});
```
