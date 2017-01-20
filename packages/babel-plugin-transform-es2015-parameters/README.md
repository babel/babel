# babel-plugin-transform-es2015-parameters

> Compile ES2015 default and rest parameters to ES5

This plugin transforms ES2015 parameters to ES5, this includes:

- Destructuring parameters
- Default parameters
- Rest parameters

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-parameters
```

## Caveats

Default parameters desugar into `let` declarations to retain proper semantics. If this is
not supported in your environment then you'll need the
[transform-block-scoping](http://babeljs.io/docs/plugins/transform-es2015-block-scoping) plugin.

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
babel --plugins transform-es2015-parameters script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-parameters"]
});
```
