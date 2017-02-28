# babel-plugin-transform-es2015-block-scoping

> Compile ES2015 block scoping (const and let) to ES5

## Examples

**In**

```javascript
for (let i=1; i<=10; i++) {
    setTimeout( function logger(){
        console.log( i ); // block scope for closure
    }, i*1000 );
}
```

**Out**

```javascript
var _loop = function _loop(i) {
    setTimeout(function logger() {
        console.log(i);
    }, i * 1000);
};

for (var i = 1; i <= 10; i++) {
    _loop(i);
}
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-es2015-block-scoping
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

Without options:

```json
{
  "plugins": ["transform-es2015-block-scoping"]
}
```

With options:

```json
{
  "plugins": [
    ["transform-es2015-block-scoping", {
      "throwIfClosureRequired": true
    }]
  ]
}
```

### Via CLI

```sh
babel --plugins transform-es2015-block-scoping script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-es2015-block-scoping"]
});
```

## Options `throwIfClosureRequired`

In cases such as the following it's impossible to rewrite let/const without adding an additional function and closure while transforming:

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1);
}
```

In extremely performance-sensitive code, this can be undesirable. If `"throwIfClosureRequired": true` is set, Babel throws when transforming these patterns instead of automatically adding an additional function.
