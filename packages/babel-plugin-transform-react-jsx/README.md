# @babel/plugin-transform-react-jsx

> Turn JSX into React function calls

## Example

### React

**In**

```javascript
var profileFrag = <>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</>;
```

**Out**

```javascript
var profileFrag = React.createElement(React.Fragment, null,
  React.createElement("img", { src: "avatar.png", className: "profile" }),
  React.createElement("h3", null, [user.firstName, user.lastName].join(" "))
);
```

### Custom

**In**

```javascript
/** @jsx dom */
/** @jsxFrag DomFrag */

var { dom } = require("deku");

var profileFrag = <>
  <img src="avatar.png" className="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</>;
```

**Out**

```javascript
/** @jsx dom */
/** @jsxFrag DomFrag */

var dom = require("deku").dom;
var DomFrag = require("deku").DomFrag; // fictional!

var profileFrag = dom(DomFrag, null,
  dom("img", { src: "avatar.png", className: "profile" }),
  dom("h3", null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-jsx
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["@babel/transform-react-jsx"]
}
```

With options:

```json
{
  "plugins": [
    ["@babel/transform-react-jsx", {
      "pragma": "dom", // default pragma is React.createElement
      "pragmaFrag": "DomFrag", // default is React.Fragment
      "throwIfNamespace": false // defaults to true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-react-jsx script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-react-jsx"]
});
```

## Options

### `pragma`

`string`, defaults to `React.createElement`.

Replace the function used when compiling JSX expressions.

Note that the `@jsx React.DOM` pragma has been deprecated as of React v0.12

### `pragmaFrag`

`string`, defaults to `React.Fragment`.

Replace the component used when compiling JSX fragments.

### `useBuiltIns`

`boolean`, defaults to `false`.

When spreading props, use `Object.assign` directly instead of Babel's extend helper.

### `throwIfNamespace`

`boolean`, defaults to `true`.

Toggles whether or not to throw an error if a XML namespaced tag name is used. For example:

    <f:image />

Though the JSX spec allows this, it is disabled by default since React's JSX does not currently have support for it.
