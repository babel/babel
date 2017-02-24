## Contributing

### Adding a new plugin to support (when approved in the next ECMAScript version)

#### Update [`pluginFeatures.js`](/data/plugin-features.js)

Example:

In you were going to add `**` which is in ES2016:

Find the relevant entries on [compat-table](https://kangax.github.io/compat-table/):

`exponentiation (**) operator`

Find the corresponding babel plugin: 

`transform-exponentiation-operator`

Add add them in this structure:

```js
// es2016
"transform-exponentiation-operator": {
  features: [
    "exponentiation (**) operator",
  ],
},
```
 
#### Update [`plugins.json`](/data/plugins.json)

Until `compat-table` is a standalone npm module for data we are using the git url

`"compat-table": "github:kangax/compat-table#gh-pages",`

So we update and then run `npm run build-data`. If there are no changes, then `plugins.json` will be the same.

### Writing Tests

#### General

All the tests for `babel-preset-env` exist in the `test/fixtures` folder. The
test setup and conventions are exactly the same as testing a Babel plugin, so
please read our [documentation on writing tests](https://github.com/babel/babel/blob/master/CONTRIBUTING.md#babel-plugin-x).

#### Testing the `debug` option

Testing debug output to `stdout` is similar. Under the `test/debug-fixtures`, 
create a folder with a descriptive name of your test, and add the following:

* Add a `options.json` file (just as the other tests, this is essentially a 
`.babelrc`) with the desired test configuration (required)
* Add a `stdout.txt` file with the expected debug output. For added 
convenience, if there is no `stdout.txt` present, the test runner will 
generate one for you.
