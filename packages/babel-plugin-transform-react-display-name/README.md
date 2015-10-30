# babel-plugin-transform-react-display-name

Add displayName to React.createClass calls

## Installation

```sh
$ npm install babel-plugin-transform-react-display-name
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
$ babel --plugins transform-react-display-name script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-display-name"]
});
```
