# babel-plugin-check-es2015-constants

Validate ES2015 constants (prevents reassignment of const variables).

## Example

**In**

```js
const a = 1;
a = 2;
```

**Out**

```bash
repl: "a" is read-only
  1 | const a = 1;
> 2 | a = 2;
    | ^
```

[Try in REPL](http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015&experimental=false&loose=false&spec=false&code=const%20a%20%3D%201%3B%0Aa%20%3D%202%3B&playground=true)

## Installation

```sh
npm install --save-dev babel-plugin-check-es2015-constants
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["check-es2015-constants"]
}
```

### Via CLI

```sh
babel --plugins check-es2015-constants script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["check-es2015-constants"]
});
```

## Note

This check will only validate consts. If you need it to compile down to `var` then you must also install and enable [`transform-es2015-block-scoping`](http://babeljs.io/docs/plugins/transform-es2015-block-scoping/).
