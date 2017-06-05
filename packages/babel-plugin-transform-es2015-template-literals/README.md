# babel-plugin-transform-es2015-template-literals

> Compile ES2015 template literals to ES5

## Example

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + bar;
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-template-literals
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-es2015-template-literals"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-template-literals", {
      "loose": true,
      "spec": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-template-literals script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-template-literals"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

In loose mode, tagged template literal objects aren't frozen.

### `spec`

`boolean`, defaults to `false`.

This option combines all template literal expressions and quasis with `String.prototype.concat`. It allows to pass the correct hint to `ToPrimitive` operation and to throw if template literal expression is a `Symbol()`. See [babel/babel#5791](https://github.com/babel/babel/pull/5791).

**In**

```javascript
`foo${bar}baz${quux}${1}`;
```

**Out**

```javascript
"foo".concat(bar, "baz").concat(quux, 1);
```
