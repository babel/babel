# babel-plugin-export-extensions

Compile export extensions to ES2015

## Installation

```sh
$ npm install babel-plugin-export-extensions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["export-extensions"]
}
```

### Via CLI

```sh
$ babel --plugins export-extensions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["export-extensions"]
});
```
