# babel-plugin-transform-react-constant-elements

> Treat React JSX elements as value types and hoist them to the highest scope

## Example

**In**

```js
const Hr = () => {
  return <hr className="hr" />;
};
```

**Out**

```js
const _ref = <hr className="hr" />;

const Hr = () => {
  return _ref;
};
```

**Deopts**

- **Spread Operator**

  ```js
  <div {...foobar} />
  ```

- **Refs**

  ```js
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
