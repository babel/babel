# babel-plugin-transform-class-constructor-call (deprecated)

> Proposal Withdrawn: can be solved with decorators.

This plugin allows Babel to transform class constructors.

It basically allows to use the [new.target](http://mdn.io/new.target) feature on ES2015 classes:

```js
class Point {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  call constructor(x, y) {
    return new Point(x, y);
  }

}

let p1 = new Point(1, 2); // OK
let p2 = Point(3, 4); // OK
```

## Example

### Date example
The javascript [Date](http://mdn.io/date) works this way:

```js
// You can get a Date instance using the new keyword
let now = new Date();
console.log(now.getMonth()); // Prints '3'
console.log(now.toString()); // Prints 'Mon Apr 11 2016 13:26:07 GMT+0100 (BST)'

// You can get a string of the current date using Date as a function:
let nowStr = Date();
console.log(nowStr); // Prints 'Mon Apr 11 2016 13:26:07 GMT+0100 (BST)'
```

It is currently possible to implement something like that using [new.target](http://mdn.io/new.target) (see [example in proposal](https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md#motivating-example)) and this new feature makes it available for ES2015 classes.

A date implementation could be:

```js
class Date {
  constructor() {
    // ...
  }

  call constructor() {
    let date = new Date();
    return date.toString();
  }
}

let now = new Date(); // Get a Date instance
let nowStr = Date(); // Use the 'call constructor()' part to get a string value of the current date
```

## Installation

```sh
npm install --save-dev babel-plugin-transform-class-constructor-call
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-class-constructor-call"]
}
```

### Via CLI

```sh
babel --plugins transform-class-constructor-call script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-class-constructor-call"]
});
```

## References

* [Inactive Proposals](https://github.com/tc39/proposals/blob/master/inactive-proposals.md)
* [Proposal: Call Constructor](https://github.com/tc39/ecma262/blob/master/workingdocs/callconstructor.md)
* [Blog post: ECMAScript proposal: function-callable classes](http://www.2ality.com/2015/10/call-constructor-esprop.html)
