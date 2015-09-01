# babel-plugin-react-display-name

Add displayName to React.createClass calls

## Installation

```sh
$ npm install babel-plugin-react-display-name
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["react-display-name"]
}
```

### Via CLI

```sh
$ babel --plugins react-display-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["react-display-name"]
});
```
