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
      "loose": true
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

When `true`, tagged template literal objects aren't frozen. All template literal expressions and quasis are combined with the `+` operator instead of with `String.prototype.concat`.

When `false` or not set, combines all template literal expressions and quasis with `String.prototype.concat`. It will handle cases with `Symbol.toPrimitive` correctly and throw correctly if template literal expression is a `Symbol()`. See [babel/babel#5791](https://github.com/babel/babel/pull/5791).

**In**

```javascript
`foo${bar}baz${quux}${1}`;
```

**Out (without `{"loose": true}`)**

```javascript
"foo".concat(bar, "baz").concat(quux, 1);
```

**Out (with `{"loose": true}`)**

```javascript
"foo" + bar + "baz" + quux + 1;
```
