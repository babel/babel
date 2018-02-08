# @babel/preset-es2017

> Babel preset for all es2017 plugins.

## Install

```sh
npm install --save-dev @babel/preset-es2017
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["@babel/preset-es2017"]
}
```

### Via CLI

```sh
babel script.js --presets @babel/preset-es2017
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  presets: ["@babel/preset-es2017"]
});
```

### Webpack

Your entrypoint needs to load the polyfills:

import 'babel-preset-es2017/polyfill';

in your webpack.config.js you will need to load additional presets to transpile down to browser compatible js:

```module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'es2017', 'react'],
          plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
        },
      },
    ],
  },
};```
