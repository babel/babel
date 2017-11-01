@babel/preset-env-standalone
=================

@babel/preset-env-standalone is a standalone build of [babel-preset-env](https://babeljs.io/docs/plugins/preset-env) for use in non-Node.js environments, including browsers.

Installation
============

There are several ways to get a copy of babel-preset-env. Pick whichever one you like:

- Use it via UNPKG: https://unpkg.com/@babel/preset-env-standalone@7/babel-preset-env.min.js. This is a simple way to embed it on a webpage without having to do any other setup.
- Install via NPM: `npm install --save @babel/preset-env-standalone`
- Manually grab `babel-preset-env.js` and/or `babel-preset-env.min.js` from the [GitHub releases page](https://github.com/babel/babel/releases). Every release includes these files.

Usage
=====

Load `babel-preset-env.js` or `babel-preset-env.min.js` in your environment, **along with Babel-standalone**. This is important: You need to load Babel too! It will be registered as an available preset of the @babel/standalone.

Then, just use it like any other preset:

```js
Babel.transform(code, {
  presets: [
    ["env", {
      "targets": {
        "browsers": "last 1 safari version"
      },
      useBuiltIns: "usage"
    }]
  ]
});
```
