# babel-preset-react

> Babel preset for all React plugins.

## Install

(Note: Run the following command to install without the CLI (for example, if CLI is already installed))

```sh
npm install --save-dev babel-preset-react
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["react"]
}
```

### Via CLI

```sh
babel script.js --presets react 
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["react"]
});
```
