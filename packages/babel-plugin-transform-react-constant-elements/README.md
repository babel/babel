# babel-plugin-transform-react-constant-elements

> Treat React JSX elements as value types and hoist them to the highest scope

Hoists element creation to the top level for subtrees that are fully static, which reduces call to `React.createElement` and the resulting allocations. More importantly, it tells React that the subtree hasn't changed so React can completely skip it when reconciling.

This transform **should be enabled only in production** (e.g., just before minifying your code) because although it improves runtime performance, it makes warning messages more cryptic.

## Example

**In**

```jsx
const Hr = () => {
  return <hr className="hr" />;
};
```

**Out**

```jsx
const _ref = <hr className="hr" />;

const Hr = () => {
  return _ref;
};
```

**Deopts**

- **Spread Operator**

  ```jsx
  <div {...foobar} />
  ```

- **Refs**

  ```jsx
  <div ref="foobar" />
  <div ref={node => this.node = node} />
  ```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-constant-elements
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-constant-elements"]
}
```

### Via CLI

```sh
babel --plugins transform-react-constant-elements script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-constant-elements"]
});
```

## References

* [[facebook/react#3226] Optimizing Compiler: Reuse Constant Value Types like ReactElement](https://github.com/facebook/react/issues/3226)
