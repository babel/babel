# babel-preset-react

> Babel preset for all React plugins.

This preset includes the following plugins/presets:

- [preset-flow](https://babeljs.io/docs/en/babel-preset-flow)
- [syntax-jsx](https://babeljs.io/docs/en/babel-plugin-syntax-jsx)
- [transform-react-jsx](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx)
- [transform-react-display-name](https://babeljs.io/docs/en/babel-plugin-transform-react-display-name)

> Also check out:

- [transform-react-constant-elements](https://babeljs.io/docs/en/transform-react-constant-elements)
- [transform-react-jsx-self](https://babeljs.io/docs/en/transform-react-jsx-self)
- [transform-react-jsx-source](https://babeljs.io/docs/en/transform-react-jsx-source)

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
