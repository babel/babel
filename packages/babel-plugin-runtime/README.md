# babel-plugin-runtime

Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals

## Installation

```sh
$ npm install babel-plugin-runtime
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["runtime"]
}
```

### Via CLI

```sh
$ babel --plugins runtime script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["runtime"]
});
```
