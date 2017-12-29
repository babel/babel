# @babel/plugin-transform-shorthand-properties

> Compile ES2015 shorthand properties to ES5

## Example

**In**

```js
var o = { a, b, c };
```

**Out**

```js
var o = { a: a, b: b, c: c };
```

**In**

```js
var cat = {
  getName() {
    return name;
  }
};
```

**Out**

```js
var cat = {
  getName: function () {
    return name;
  }
};
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-shorthand-properties
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/plugin-transform-shorthand-properties"]
}
```

### Via CLI

```sh
babel --plugins @babel/plugin-transform-shorthand-properties script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-shorthand-properties"]
});
```

## Options

### `spec`

`boolean`, defaults to `false`.

Adds a runtime check to ensure the function created from the object method is not instantiated.
