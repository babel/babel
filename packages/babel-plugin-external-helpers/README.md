# babel-plugin-external-helpers

> Adds external helpers via a babel plugin.

## Detail

Babel has a few helper functions that'll be placed at the top of the generated
code if needed so it's not inlined multiple times throughout that file. This may
become an issue if you have multiple files, especially when you're sending them
to the browser. gzip alleviates most of this concern but it's still not ideal.

You can tell Babel to not place any declarations at the top of your files and
instead just point them to a reference contained within the external helpers.

### Getting the external helpers

To build the helpers, you will need to use `babel-cli`. You can install `babel-cli` with:

```sh
npm install babel-cli --save-dev
```

This will add `babel-external-helpers` to your .bin.

You can output the file using

```sh
./node_modules/.bin/babel-external-helpers [options] > helpers.js
```

You need to import/inject this file before executing your own code (instructions below).

#### Options

| Option                     | Default              | Description                                 |
| -------------------------- | -------------------- | ------------------------------------------- |
| `-t, --output-type [type]` | `global`             | Set output format: `global`, `umd` or `var` |
| `-l, --whitelist`          |                      | Whitelist of helpers to ONLY include        |

### Output formats

#### global

`global` output format sets helpers as global variable by adding `babelHelpers` to `global` or `self`.

#### umd

`umd` output format wraps helpers in UMD compatible with browsers, CommonJS and AMD.

#### var

`var` outputs variable `babelHelpers` (`var babelHelpers = {}`) and helpers are assigned to it. This output format is suitable for additional processing.

### Injecting the external helpers

#### Node

```js
require("babel-core").buildExternalHelpers();
```

This injects the external helpers into `global`.

#### Browser

```html
<script type="application/javascript" src="your-path-to/babel/external-helpers.js"></script>
```

In a browser environment you can use a `<script>` tag to inject the `babelHelpers` into the `window` object.

## Installation

```sh
npm install --save-dev babel-plugin-external-helpers
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["external-helpers"]
}
```

### Via CLI

```sh
babel --plugins external-helpers script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["external-helpers"]
});
```

