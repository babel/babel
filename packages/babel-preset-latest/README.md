# babel-preset-latest

> Babel preset including es2015, es2016, es2017.

## Install

```sh
npm install --save-dev babel-preset-latest
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["latest"]
}
```

### Via CLI

```sh
babel script.js --presets latest
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["latest"]
});
```

### Options

- `es2015`: Optionally not run any plugins from this preset (defaults to true)
- `es2016`: Optionally not run any plugins from this preset (defaults to true)
- `es2017`: Optionally not run any plugins from this preset (defaults to true)

```js
{
  "presets": [
    ["latest", {
      "es2015": false // defaults to true
    }]
  ]
}
```

You can also pass options down to the `es2015` preset.

```js
{
  "presets": [
    ["latest", {
      "es2015": {
        "modules": false 
      }
    }]
  ]
}
```
