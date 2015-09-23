# babel-plugin-transform-es5-property-mutators

Compile ES5 property mutator shorthand syntax to Object.defineProperty

## Installation

```sh
$ npm install babel-plugin-transform-es5-property-mutators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es5-property-mutators"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es5-property-mutators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es5-property-mutators"]
});
```
