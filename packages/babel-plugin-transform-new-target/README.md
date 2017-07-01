# babel-plugin-transform-new-target

This plugins allows babel to transform `new.target` meta property into a
(correct in most cases) `this.constructor` expression.

## Example

```js
function Foo() {
  console.log(new.target);
}

Foo(); // => undefined
new Foo(); // => Foo
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

This plugin relies on `this.constructor`, which means `super` must
already have been called when using untransformed classes.

```js
class Foo {}

class Bar extends Foo {
  constructor() {
    // This will be a problem if classes aren't transformed to ES5
    new.target;
    super();
  }
}
```

Additionally, this plugin cannot transform all `Reflect.construct` cases
when using `newTarget` with ES5 function classes (transformed ES6 classes).

```js
function Foo() {
  console.log(new.target);
}

// Bar extends Foo in ES5
function Bar() {
  Foo.call(this);
}
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.constructor = Bar;

// Baz does not extend Foo
function Baz() {}

Reflect.construct(Foo, []); // => Foo (correct)
Reflect.construct(Foo, [], Bar); // => Bar (correct)

Reflect.construct(Bar, []); // => Bar (incorrect, though this is how ES5
                            // inheritience is commonly implemented.)
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
