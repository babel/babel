# babel-preset-es2017

> Babel preset for all ES2017 plugins and polyfills

## Install


```sh
$ npm install --save babel-preset-es2017
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2017"]
}
```

### Via CLI

```sh
$ babel script.js --presets es2017 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2017"]
});
```

### Webpack
Your entrypoint needs to load the polyfills:

```js
import 'babel-preset-es2017/polyfill';
```

in your `webpack.config.js` you will need to load additional presets to transpile down to browser compatible js:

```js
module.exports = {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'es2016', 'es2017'],
          plugins: ['transform-runtime'],
        },
      },
    ],
  },
};
```