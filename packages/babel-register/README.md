# babel-register

The require hook will bind itself to node's require and automatically compile files on the fly.

## Install

```
$ npm install babel-register
```

## Usage

```js
require("babel-register");
```

All subsequent files required by node with the extensions `.es6`, `.es`, `.jsx` and `.js` will be transformed by Babel.

See [documentation](http://babeljs.io/docs/usage/require/) for details.
