# babel-plugin-lint-no-undefined-identifier

> Used internally to lint plugin code. Disallows use of `t.identifier("undefined")` in favor of `path.scope.buildUndefinedNode()`

## Example

The following will throw an exception and fail to compile.

```javascript
t.identifier("undefined");
```

## Installation

```sh
npm install --save-dev babel-plugin-lint-no-undefined-identifier
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["lint-no-undefined-identifier"]
}
```

### Via CLI

```sh
babel --plugins lint-no-undefined-identifier script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["lint-no-undefined-identifier"]
});
```
