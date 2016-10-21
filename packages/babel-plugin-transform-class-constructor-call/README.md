# babel-plugin-transform-class-constructor-call (deprecated)

## Installation

```sh
$ npm install babel-plugin-transform-class-constructor-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-class-constructor-call"]
}
```

### Via CLI

```sh
$ babel --plugins transform-class-constructor-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-constructor-call"]
});
```
