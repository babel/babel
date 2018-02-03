# babel-plugin-transform-regenerator

> This plugin uses the [regenerator](https://github.com/facebook/regenerator) module to
transform async and generator functions. `regeneratorRuntime` is not included.

> #### Runtime required
> 
> You need to use either the [Babel polyfill](/docs/usage/polyfill) or the [regenerator runtime](https://github.com/facebook/regenerator/blob/master/packages/regenerator-runtime/runtime.js) so that `regeneratorRuntime` will be defined.

> #### Async functions
> 
> These are only usable if you enable their syntax plugin. See [syntax-async-functions](/docs/plugins/syntax-async-functions) for information.

## Example

**In**

```javascript
function* a() {
  yield 1;
}
```

**Out**

```javascript
var _marked = [a].map(regeneratorRuntime.mark);

function a() {
  return regeneratorRuntime.wrap(function a$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 1;

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked[0], this);
}
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-regenerator
```

## Usage

### Via `.babelrc` (Recommended)

Without options:

```json
{
  "plugins": ["transform-regenerator"]
}
```

With options:

|name|default value|
|---|---|
|asyncGenerators|true|
|generators|true|
|async|true|

```json
{
  "plugins": [
    ["transform-regenerator", {
      "asyncGenerators": false,
      "generators": false,
      "async": false
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-regenerator script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-regenerator"]
});
```
