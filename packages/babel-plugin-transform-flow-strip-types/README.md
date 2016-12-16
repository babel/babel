# babel-plugin-transform-flow-strip-types

> Strip all [flow](http://flowtype.org) type annotations and declarations from your output code.

## Example

**In**

```javascript
function foo(one: any, two: number, three?): string {}
```

**Out**

```javascript
function foo(one, two, three) {}
```

[Try in REPL](http://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=react&code=function%20foo(one%3A%20any%2C%20two%3A%20number%2C%20three%3F)%3A%20string%20%7B%7D&experimental=false&loose=false&spec=false&playground=false&stage=0
)

## Installation

```sh
npm install --save-dev babel-plugin-transform-flow-strip-types
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-flow-strip-types"]
}
```

### Via CLI

```sh
babel --plugins transform-flow-strip-types script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-flow-strip-types"]
});
```
