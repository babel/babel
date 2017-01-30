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

### `es2015`

`boolean`, defaults to `false`.

Toggles including plugins from the [es2015 preset](/docs/plugins/preset-es2015/).

```js
{
  "presets": [
    ["latest", {
      "es2015": false // defaults to true
    }]
  ]
}
```

You can also pass options down to the `es2015` preset. This also works for the other preset options.

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

### `es2016`

`boolean`, defaults to `false`.

Toggles including from the [es2016 preset](/docs/plugins/preset-es2016/).

### `es2017`

`boolean`, defaults to `false`.

Toggles including plugins from the [es2017 preset](/docs/plugins/preset-es2017/).
