# babel-preset-es2015

> Babel preset for all es2015 plugins.

> This is deprecated. If you want to stay up to date, use the [env preset](https://babeljs.io/docs/en/babel-preset-env)

This preset includes the following plugins:

- [check-es2015-constants](https://babeljs.io/docs/en/babel-plugin-check-es2015-constants)
- [transform-es2015-arrow-functions](https://babeljs.io/docs/en/babel-plugin-transform-es2015-arrow-functions)
- [transform-es2015-block-scoped-functions](https://babeljs.io/docs/en/babel-plugin-transform-es2015-block-scoped-functions)
- [transform-es2015-block-scoping](https://babeljs.io/docs/en/babel-plugin-transform-es2015-block-scoping)
- [transform-es2015-classes](https://babeljs.io/docs/en/babel-plugin-transform-es2015-classes)
- [transform-es2015-computed-properties](https://babeljs.io/docs/en/babel-plugin-transform-es2015-computed-properties)
- [transform-es2015-destructuring](https://babeljs.io/docs/en/babel-plugin-transform-es2015-destructuring)
- [transform-es2015-duplicate-keys](https://babeljs.io/docs/en/babel-plugin-transform-es2015-duplicate-keys) 
- [transform-es2015-for-of](https://babeljs.io/docs/en/babel-plugin-transform-es2015-for-of)
- [transform-es2015-function-name](https://babeljs.io/docs/en/babel-plugin-transform-es2015-function-name)
- [transform-es2015-literals](https://babeljs.io/docs/en/babel-plugin-transform-es2015-literals)
- [transform-es2015-modules-commonjs](https://babeljs.io/docs/en/babel-plugin-transform-es2015-modules-commonjs)
- [transform-es2015-object-super](https://babeljs.io/docs/en/babel-plugin-transform-es2015-object-super)
- [transform-es2015-parameters](https://babeljs.io/docs/en/babel-plugin-transform-es2015-parameters)
- [transform-es2015-shorthand-properties](https://babeljs.io/docs/en/babel-plugin-transform-es2015-shorthand-properties)
- [transform-es2015-spread](https://babeljs.io/docs/en/babel-plugin-transform-es2015-spread)
- [transform-es2015-sticky-regex](https://babeljs.io/docs/en/babel-plugin-transform-es2015-sticky-regex)
- [transform-es2015-template-literals](https://babeljs.io/docs/en/babel-plugin-transform-es2015-template-literals)
- [transform-es2015-typeof-symbol](https://babeljs.io/docs/en/babel-plugin-transform-es2015-typeof-symbol)
- [transform-es2015-unicode-regex](https://babeljs.io/docs/en/babel-plugin-transform-es2015-unicode-regex)
- [transform-regenerator](https://babeljs.io/docs/en/babel-plugin-transform-regenerator)

## Install

```sh
npm install --save-dev babel-preset-es2015
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2015"]
}
```

### Via CLI

```sh
babel script.js --presets es2015
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2015"]
});
```

## Options

### `loose`

`boolean`, defaults to `false`.

Enable "loose" transformations for any plugins in this preset that allow them.

### `modules`

`"amd" | "umd" | "systemjs" | "commonjs" | false`, defaults to `"commonjs"`.

Enable transformation of ES6 module syntax to another module type.

Setting this to `false` will not transform modules.

### `spec`

`boolean`, defaults to `false`.

Enable "spec" transformations for any plugins in this preset that allow them.

## Basic Setup (with the CLI)

> For more info, check out docs for [babel-cli](https://babeljs.io/docs/en/babel-cli)

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-es2015
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["es2015"] }' > .babelrc
```

Create a file to run on

```sh
echo 'const a = 1;' > index.js
```

Run it

```sh
./node_modules/.bin/babel-node index.js
```
