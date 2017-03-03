# babel-plugin-transform-react-inline-elements

> Replaces the `React.createElement` function with one that is more optimized for production: `babelHelpers.jsx`.

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
npm install --save-dev babel-plugin-transform-react-inline-elements
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
