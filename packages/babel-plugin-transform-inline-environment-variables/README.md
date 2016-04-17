# babel-plugin-transform-inline-environment-variables

Inline environment variables

## Example

### In

```js
// assuming process.env.NODE_ENV is actually "development"
process.env.NODE_ENV;
```

### Out

```js
"development";
```

## Installation

```sh
$ npm install babel-plugin-transform-inline-environment-variables
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
// without options
{
  "plugins": ["transform-inline-environment-variables"]
}

// with options
{
  "plugins": [
    ["transform-inline-environment-variables", {
      "defaults": {
        "NODE_ENV": "development"
      }
    }]
  ]
}
```

### Via CLI

```sh
$ babel --plugins transform-inline-environment-variables script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-inline-environment-variables"]
});
```
