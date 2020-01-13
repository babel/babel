# @babel/preset-stage-2

As of v7.0.0-beta.55, we've removed Babel's Stage presets. Please consider reading our [blog post](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets) on this decision for more details. TL;DR is that it's more beneficial in the long run to explicitly add which proposals to use.

---

For a more automatic migration, we have updated [babel-upgrade](https://github.com/babel/babel-upgrade) to do this for you (you can run `npx babel-upgrade`).

If you want the same configuration as before:

```jsonc
{
  "plugins": [
    // Stage 2
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",

    // Stage 3
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    "@babel/plugin-proposal-json-strings"
  ]
}
```

If you're using the same configuration across many separate projects,
keep in mind that you can also create your own custom presets with
whichever plugins and presets you're looking to use.

```js
module.exports = function() {
  return {
    plugins: [
      require("@babel/plugin-syntax-dynamic-import"),
      [require("@babel/plugin-proposal-decorators"), { "legacy": true }],
      [require("@babel/plugin-proposal-class-properties"), { "loose": false }],
    ],
    presets: [
      // ...
    ],
  };
};
```

**NOTE: Compatibility between `@babel/plugin-proposal-class-properties` and `@babel/plugin-proposal-decorators`**
If you are including your plugins manually and using `@babel/plugin-proposal-class-properties`, make sure that `@babel/plugin-proposal-decorators` comes before `@babel/plugin-proposal-class-properties`.

When using the `legacy: true` option of `@babel/plugin-proposal-decorators`, `@babel/plugin-proposal-class-properties` must be used in `loose: true` mode.

If you are not using `@babel/plugin-proposal-decorators`, `loose` mode is not needed.