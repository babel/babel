# babel-plugin-constant-folding

Compile static constants (ie. code that we can statically determine to be constant at runtime)

## Installation

```sh
$ npm install babel-plugin-constant-folding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["constant-folding"]
}
```

### Via CLI

```sh
$ babel --plugins constant-folding script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["constant-folding"]
});
```
