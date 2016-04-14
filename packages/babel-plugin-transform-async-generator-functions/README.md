# babel-plugin-transform-async-functions

Turn async generator functions and for-await statements to ES2015 generators

## Installation

```sh
$ npm install babel-plugin-transform-async-generator-functions
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-async-generator-functions"]
}
```

### Via CLI

```sh
$ babel --plugins transform-async-generator-functions script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-async-generator-functions"]
});
```
