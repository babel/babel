var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var obj = {};
var foo = "foo";
var bar = "bar";

// constants
const MULTIPLIER = 5;

// classes
class Foo {
  constructor() {
    this.foo = "bar";
  }
}

class Bar extends Foo {
  constructor() {
    super();
  }

  // default parameters
  go(foo = "bar", bar = "foo") {

  }

  // not supported by jstransform
  //get foo() {
  //  return this._foo;
  //}
  //set foo(val) {
  //  this._foo = val + " foo!";
  //}
}

// arrow functions
arr.map(x => x * x);

// block binding
for (let key in arr) {
  let val = arr[key];
  console.log(key, val);
}

// computed property names
obj = {
  ["foo" + bar]: "foobar"
};

// destructuring
var [a, [b], c, d] = ["hello", [", ", "junk"], ["world"]];
console.log(a + b + c);

// array comprehension
// [for (i of [1, 2, 3]) i * i]; // not supported by es6now

// for-of
for (var i of [1, 2, 3]) {
  console.log(i * i);
}

// property method assignment
obj = {
  foo() {
    return "foobar";
  },

  get bar() {
    return this._bar;
  },

  set bar(val) {
    this._bar = val;
  }
};

// property name shorthand
function f(x, y) {
  return { x, y };
}

// rest parameters
function printList(name, ...items) {
  console.log("list %s has the following items", name);
  items.forEach(function (item) {
    console.log(item);
  });
}

// spread
function add(x, y) {
  return x + y;
}
var numbers = [5, 10];
add(...numbers);

// template literals
var x = 5;
var y = 10;
console.log(`${x} + ${y} = ${x + y}`);
