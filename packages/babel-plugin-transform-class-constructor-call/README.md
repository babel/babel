# babel-plugin-transform-class-construtor-call

## Installation

```sh
$ npm install babel-plugin-transform-class-construtor-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-class-construtor-call"]
}
```

### Via CLI

```sh
$ babel --plugins transform-class-construtor-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-construtor-call"]
});
```
