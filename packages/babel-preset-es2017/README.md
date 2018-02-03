# babel-preset-es2017

> Babel preset for all es2017 plugins.

> This is deprecated. If you want to stay up to date, use the [env preset](https://www.npmjs.com/package/babel-preset-env)

This preset includes the following plugins:

- [syntax-trailing-function-commas](https://www.npmjs.com/package/babel-plugin-syntax-trailing-function-commas/)
- [transform-async-to-generator](https://www.npmjs.com/package/babel-plugin-transform-async-to-generator/)

## Install

```sh
npm install --save-dev babel-preset-es2017
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
babel script.js --presets es2017
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2017"]
});
```


## Basic Setup (with the CLI)

> For more info, check out docs for [babel-cli](https://www.npmjs.com/package/babel-cli)

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-es2017
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["es2017"] }' > .babelrc
```

Create a file to run on

```sh
echo 'async function a() {}' > index.js
```

Run it

```sh
./node_modules/.bin/babel-node index.js
```
