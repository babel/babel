# babel-plugin-transform-es2015-parameters

Compile ES2015 default and rest parameters to ES5

## Installation

```sh
$ npm install babel-plugin-transform-es2015-parameters
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-parameters"]
}
```

### Via CLI

```sh
$ babel --plugins transform-es2015-parameters script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-parameters"]
});
```
