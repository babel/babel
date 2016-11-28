# babel-plugin-transform-react-inline-elements

Replaces the `React.createElement` function with one that is more optimized for production: `babelHelpers.jsx`.

<blockquote class="babel-callout babel-callout-info">
  <p>
    Note that this requires the global polyfill due to React's use of ES6 <code>Symbol</code> when validating React Elements.
    If <code>Symbol</code> is not present in the browser, your application will fail to render, as Babel will polyfill <code>Symbol</code>
    but React will not have access to that polyfill.
  </p>

  <p>Therefore, you must require the global polyfill at the entry point to your application:</p>

  <code>require("babel-polyfill");</code>
</blockquote>

This transform **should be enabled only in production** (e.g., just before minifying your code) because although it improves runtime performance, it makes warning messages more cryptic and skips important checks that happen in development mode, including propTypes.

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
npm install babel-plugin-transform-react-inline-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-inline-elements"]
}
```

### Via CLI

```sh
babel --plugins transform-react-inline-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-inline-elements"]
});
```

## References

* [[facebook/react#3228] Optimizing Compiler: Inline React Elements](https://github.com/facebook/react/issues/3228)
