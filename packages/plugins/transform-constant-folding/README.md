# babel-plugin-transform-constant-folding

Compile static constants (ie. code that we can statically determine to be constant at runtime)

## Installation

```sh
$ npm install babel-plugin-transform-constant-folding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-constant-folding"]
}
```

### Via CLI

```sh
$ babel --plugins transform-constant-folding script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-constant-folding"]
});
```
