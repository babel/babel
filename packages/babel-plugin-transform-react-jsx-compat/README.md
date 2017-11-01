# @babel/plugin-transform-react-jsx-compat

> Turn JSX into React Pre-0.12 function calls

## Example

**In**

```javascript
var profile = <div>
  <img src="avatar.png" class="profile" />
  <h3>{[user.firstName, user.lastName].join(' ')}</h3>
</div>;
```

**Out**

```javascript
var profile = React.DOM.div(null,
  React.DOM.img({ src: "avatar.png", "class": "profile" }),
  React.DOM.h3(null, [user.firstName, user.lastName].join(" "))
);
```

## Installation

```sh
npm install --save-dev @babel/plugin-transform-react-jsx-compat
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["@babel/transform-react-jsx-compat"]
}
```

### Via CLI

```sh
babel --plugins @babel/transform-react-jsx-compat script.js
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
  plugins: ["@babel/transform-react-jsx-compat"]
});
```
