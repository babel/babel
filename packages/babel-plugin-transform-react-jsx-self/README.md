# babel-plugin-transform-react-jsx-self

> Adds `__self` prop to JSX elements, which React will use to generate some runtime warnings.  All React users should enable this transform in dev mode.

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __self={this} />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-jsx-self
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-jsx-self"]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx-self script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx-self"]
});
```
