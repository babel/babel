# babel-plugin-transform-react-jsx-source

> Adds source file and line number to JSX elements.

## Example

**In**

```
<sometag />
```

**Out**

```
<sometag __source={ { fileName: 'this/file.js', lineNumber: 10 } } />
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-react-jsx-source
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-react-jsx-source"]
}
```

### Via CLI

```sh
babel --plugins transform-react-jsx-source script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-react-jsx-source"]
});
```
