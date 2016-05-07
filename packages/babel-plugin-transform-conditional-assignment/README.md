# babel-plugin-transform-conditional-assignment

Compile ES2017 conditional assignment to ES5.  Conditonal assignment a stage 0
strawman proposal conditional assignment operator, also called an "or equals"
operator(`||=`).  Using or equals in

```
foo ||= val
```

is the semantic equivalent of

```
if (!foo) {
  foo = val
}
```

More examples

```
let foo
foo ||= 'foo'
foo === 'foo'
// evaluates to true
```

```
    let bar = 'other value'
    bar ||= 'bar'
    bar === 'bar'
    // evaluates to false
```

```
    let baz = ''
    baz ||= undefined
    baz === undefined
    // evaluates to true
```

## Installation

```sh
$ npm install babel-plugin-transform-conditional-assignment
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-conditional-assignment"]
}
```

### Via CLI

```sh
$ babel --plugins transform-conditional-assignment script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-conditional-assignment"]
});
```
