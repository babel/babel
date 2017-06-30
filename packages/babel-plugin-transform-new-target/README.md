# babel-plugin-transform-new-target

This plugins allows babel to transform `new.target` meta property into a
(correct in most cases) `this.constructor` expression.

## Example

```js
function Foo() {
  console.log(new.target);
}

function Bar() {
  Foo.call(this);
}

Foo(); // => undefined
new Foo(); // => Foo
new Bar(); // => undefined
```

```js
class Foo {
  constructor() {
    console.log(new.target);
  }
}

class Bar extends Foo {
}

new Foo(); // => Foo
new Bar(); // => Bar
```

### Caveats

This plugin cannot transform all `Reflect.construct` cases when using
`newTarget`.

```js
class Foo {
  constructor() {
    console.log(new.target);
  }
}

class Bar extends Foo {
}

class Baz {
}

Reflect.construct(Foo, []); // => Foo (correct)
Reflect.construct(Bar, []); // => Bar (correct)
Reflect.construct(Foo, [], Bar); // => Bar (correct)
Reflect.construct(Foo, [], Baz); // => undefined (incorrect)
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-new-target
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-new-target"]
}
```

### Via CLI

```sh
babel --plugins transform-new-target script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-new-target"]
});
```
