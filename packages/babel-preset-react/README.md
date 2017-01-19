# babel-preset-react

> Babel preset for all React plugins.

This preset includes the following plugins:

- [syntax-flow](https://babeljs.io/docs/plugins/syntax-flow/)
- [syntax-jsx](https://babeljs.io/docs/plugins/syntax-jsx/)
- [transform-flow-strip-types](https://babeljs.io/docs/plugins/transform-flow-strip-types/)
- [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/)
- [transform-react-display-name](https://babeljs.io/docs/plugins/transform-react-display-name/)

## Install

> You can also check out the React [Getting Started page](https://facebook.github.io/react/docs/hello-world.html)

> For more info, check out the setup page on the [cli](/docs/setup/) and the [usage](/docs/usage/cli/) docs.

Install the CLI and this preset

```sh
npm install --save-dev babel-cli babel-preset-react
```

Make a .babelrc config file with the preset

```sh
echo '{ "presets": ["react"] }' > .babelrc
```

Create a file to run on

```sh
echo '<h1>Hello, world!</h1>' > index.js
```

View the output

```sh
./node_modules/.bin/babel index.js
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["react"]
}
```

### Via CLI

```sh
babel script.js --presets react 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["react"]
});
```
