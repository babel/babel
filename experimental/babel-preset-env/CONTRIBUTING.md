## Contributing

### Adding a new plugin to support (when approved in the next ECMAScript version)

#### Update [`pluginFeatures.js`](/data/pluginFeatures.js)

Example:

In you were going to add `**` which is in ES2016:

Find the relevant entries on [compat-table](kangax.github.io/compat-table/):

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
