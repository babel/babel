# @babel/plugin-transform-react-inline-elements

> Replaces the `React.createElement` function with one that is more optimized for production: `babelHelpers.jsx`.

## Note

When used alongside `transform-runtime`, polyfills (by default including `Symbol`) are specifically scoped to not pollute the global scope. This breaks usage with React, as it won't have access to that polyfill and will cause your application to fail in legacy browsers.

Even if `['transform-runtime', { helpers: true, polyfill: false }]` is specified, it might still break, since `helpers` come precompiled.

In this case, we recommend importing/requiring `@babel/polyfill` in the entry point of your application and using `@babel/preset-env` with the `useBuiltIns` option to only include the polyfills your targets need. Alternatively, you can also import/require `core-js/modules/es6.symbol` by itself.

This transform **should be enabled only in production** (e.g., just before minifying your code) because, although it improves runtime performance, it makes warning messages more cryptic and skips important checks that happen in development mode, including propTypes.

## Example

**In**

```javascript
<Baz foo="bar" key="1"></Baz>;
```

**Out**

```javascript
babelHelpers.jsx(Baz, {
  foo: "bar"
}, "1");

/**
 * Instead of
 *
 * React.createElement(Baz, {
 *   foo: "bar",
 *   key: "1",
 * });
 */
```

**Deopt**

```js
// The plugin will still use React.createElement when `ref` or `object rest spread` is used
<Foo ref="bar" />
<Foo {...bar} />
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-inline-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-react-inline-elements"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-react-inline-elements script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-react-inline-elements"]
});
```

## References

* [[facebook/react#3228] Optimizing Compiler: Inline React Elements](https://github.com/facebook/react/issues/3228)
