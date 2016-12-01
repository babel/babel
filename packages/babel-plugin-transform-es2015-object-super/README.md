# babel-plugin-transform-es2015-object-super

> Compile ES2015 object super to ES5

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-object-super
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-es2015-object-super"]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-object-super script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-object-super"]
});
```
