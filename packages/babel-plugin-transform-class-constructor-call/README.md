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
[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=class%20Point%20%7B%0A%0A%20%20constructor(x%2C%20y)%20%7B%0A%20%20%20%20this.x%20%3D%20x%3B%0A%20%20%20%20this.y%20%3D%20y%3B%0A%20%20%7D%0A%0A%20%20call%20constructor(x%2C%20y)%20%7B%0A%20%20%20%20return%20new%20Point(x%2C%20y)%3B%0A%20%20%7D%0A%0A%7D%0A%0Alet%20p1%20%3D%20new%20Point(1%2C%202)%3B%20%2F%2F%20OK%0Alet%20p2%20%3D%20Point(3%2C%204)%3B%20%2F%2F%20OK)

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
[Try in REPL](http://babeljs.io/repl/#?evaluate=true&presets=es2015%2Cstage-0&code=class%20Date%20%7B%0A%20%20constructor()%20%7B%0A%20%20%20%20%2F%2F%20...%0A%20%20%7D%0A%0A%20%20call%20constructor()%20%7B%0A%20%20%20%20let%20date%20%3D%20new%20Date()%3B%0A%20%20%20%20return%20date.toString()%3B%0A%20%20%7D%0A%7D%0A%0Alet%20now%20%3D%20new%20Date()%3B%20%2F%2F%20Get%20a%20Date%20instance%0Alet%20nowStr%20%3D%20Date()%3B%20%2F%2F%20Use%20the%20'call%20constructor()'%20part%20to%20get%20a%20string%20value%20of%20the%20current%20date)

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
