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

```js
// without options
{
  "plugins": ["transform-es2015-template-literals"]
}

// with options
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
In loose mode, tagged template literal objects aren't frozen.


### `spec`
This option wraps all template literal expressions with `String`. See [babel/babel#1065](https://github.com/babel/babel/issues/1065) for more info.

**In**

```javascript
`foo${bar}`;
```

**Out**

```javascript
"foo" + String(bar);
```
