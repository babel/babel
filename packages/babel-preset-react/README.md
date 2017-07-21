# babel-preset-react

> Babel preset for all React plugins.

This preset always includes the following plugins:

- [syntax-jsx](https://babeljs.io/docs/plugins/syntax-jsx/)
- [transform-flow-strip-types](https://babeljs.io/docs/plugins/transform-flow-strip-types/)
- [transform-react-jsx](https://babeljs.io/docs/plugins/transform-react-jsx/)
- [transform-react-display-name](https://babeljs.io/docs/plugins/transform-react-display-name/)

And with the `development` option:

- [transform-react-jsx-self](https://babeljs.io/docs/plugins/transform-react-jsx-self/)
- [transform-react-jsx-source](https://babeljs.io/docs/plugins/transform-react-jsx-source/)

Note: Flow annotations and declarations will _only_ be removed in files that
have the `// @flow ` directive.

```js
// @flow
function foo(numVal: number, strVal: string) {}
```

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

## Options

### `development`

`boolean`, defaults to `false`.

Toggles plugins that aid in development, such as [`babel-plugin-transform-react-jsx-self`](https://babeljs.io/docs/plugins/transform-react-jsx-self/) and [`babel-plugin-transform-react-jsx-source`](https://babeljs.io/docs/plugins/transform-react-jsx-source/).
