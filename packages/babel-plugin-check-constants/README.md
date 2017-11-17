# @babel/plugin-check-constants

> Validate ES2015 constants (prevents reassignment of const variables).

## Example

**In**

```js
const a = 1;
a = 2;
```

**Out**

```bash
repl: "a" is read-only
  1 | const a = 1;
> 2 | a = 2;
    | ^
```


## Installation

```sh
npm install --save-dev @babel/plugin-check-constants
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/check-constants"]
}
```

### Via CLI

```sh
babel --plugins @babel/check-constants script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/check-constants"]
});
```

## Note

This check will only validate consts. If you need it to compile down to `var` then you must also install and enable [`@babel/plugin-transform-block-scoping`](http://babeljs.io/docs/plugins/transform-block-scoping/).
