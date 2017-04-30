# babel-plugin-transform-react-display-name

> Add displayName to React.createClass calls, ES6-classes style components and stateless components that return JSX.


## Example

### React.createClass calls
**In**

```js
var foo = React.createClass({});
```

**Out**

```js
var foo = React.createClass({
  displayName: "foo"
});
```
### Stateless components
**In**

```js
var foo = () => <div></div>;
```

**Out**

```js
var foo = () => <div></div>;
foo.displayName = 'foo';
```

### ES6-classes style components
**In**

```js
class Foo extends React.Component {
  render() {
    return <div></div>;
  }
}
```

**Out**

```js
class Foo extends React.Component {
  render() {
    return <div></div>;
  }
}
Foo.displayName = 'Foo';
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-display-name
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
require("babel-core").transform("code", {
  plugins: ["transform-react-display-name"]
});
```
