# @babel/preset-react

> Babel preset for all React plugins.

This preset always includes the following plugins:

- [syntax-jsx](https://babeljs.io/docs/plugins/syntax-jsx/)
- [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/)
- [transform-react-display-name](https://babeljs.io/docs/plugins/transform-react-display-name/)

And with the `development` option:

- [transform-react-jsx-self](https://babeljs.io/docs/plugins/transform-react-jsx-self/)
- [transform-react-jsx-source](https://babeljs.io/docs/plugins/transform-react-jsx-source/)

> Note: Flow syntax support is no longer enabled in v7. For that, you will need to add the [Flow preset](https://babeljs.io/docs/plugins/preset-flow/).

## Installation

> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

```sh
npm install --save-dev @babel/preset-react
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/react"]
}
```

### Via CLI

```sh
babel --presets @babel/react script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/react"]
});
```

## Options

### `development`

`boolean`, defaults to `false`.

Toggles plugins that aid in development, such as [`@babel/plugin-transform-react-jsx-self`](https://babeljs.io/docs/plugins/transform-react-jsx-self/) and [`@babel/plugin-transform-react-jsx-source`](https://babeljs.io/docs/plugins/transform-react-jsx-source/).

This is useful when combined with either a `babelrc.js` or [env option in a .babelrc](https://babeljs.io/docs/usage/babelrc/#env-option) configuration:

#### babelrc.js

```js
module.exports = {
  presets: [
    ["@babel/react", {
      development: process.env.BABEL_ENV === "development"
    }],
  ],
}
```

#### .babelrc

> Note: the `env` option will likely get deprecated soon

```json
{
  "presets": ["@babel/react"],
  "env": {
    "development": {
      "presets": [
        ["@babel/react", { "development": true }]
      ]
    }
  }
}
```
