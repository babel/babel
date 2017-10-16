# babel-plugin-transform-react-display-name

> Add displayName to `createReactClass` (and `React.createClass`) calls

## Example

**In**

```js
var foo = React.createClass({}); // React <= 15
var bar = createReactClass({});  // React 16+
```

**Out**

```js
var foo = React.createClass({
  displayName: "foo"
}); // React <= 15
var bar = createReactClass({
  displayName: "bar"
}); // React 16+
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-display-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-display-name"]
}
```

### Via CLI

```sh
babel --plugins transform-react-display-name script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["transform-react-display-name"]
});
```
