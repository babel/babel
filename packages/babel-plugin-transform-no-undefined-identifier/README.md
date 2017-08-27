# babel-plugin-transform-no-undefined-identifier

> Used internally to lint plugin code. Disallows use of `t.identifier("undefined")` in favor of `path.scope.buildUndefinedNode()`

## Example

The following will throw an exception and fail to compile.

```javascript
t.identifier("undefined");
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-no-undefined-identifier
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-no-undefined-identifier"]
}
```

### Via CLI

```sh
babel --plugins transform-no-undefined-identifier script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-no-undefined-identifier"]
});
```
