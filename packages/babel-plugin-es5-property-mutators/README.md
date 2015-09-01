# babel-plugin-es5-property-mutators

Compile ES5 property mutator shorthand syntax to Object.defineProperty

## Installation

```sh
$ npm install babel-plugin-es5-property-mutators
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["es5-property-mutators"]
}
```

### Via CLI

```sh
$ babel --plugins es5-property-mutators script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["es5-property-mutators"]
});
```
