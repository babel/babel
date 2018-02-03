# babel-preset-es2016

> Babel preset for all es2016 plugins.

> This is deprecated. If you want to stay up to date, use the [env preset](https://babeljs.io/docs/en/babel-preset-env)

This preset includes the following plugins:

- [transform-exponentiation-operator](https://babeljs.io/docs/en/babel-plugin-transform-exponentiation-operator)

## Install

```sh
npm install --save-dev babel-preset-es2016
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2016"]
}
```

### Via CLI

```sh
babel script.js --presets es2016
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2016"]
});
```

## Basic Setup (with the CLI)

> For more info, check out docs for [babel-cli](https://babeljs.io/docs/en/babel-cli)

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-es2016
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["es2016"] }' > .babelrc
```

Create a file to run on

```sh
echo 'console.log(2 ** 3)' > index.js
```

Run it

```sh
./node_modules/.bin/babel-node index.js
```
