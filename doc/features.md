# Features

## Abstract references ([experimental](usage.md#experimental)) ([spec](https://github.com/zenparsing/es-abstract-refs))

```javascript
foo::bar;
foo::bar = baz;
delete foo::bar;
```

## Array comprehensions ([experimental](usage.md#experimental))

```javascript
var results = [for (c of customers) if (c.city == "Seattle") { name: c.name, age: c.age }]
```

## Arrow functions

```javascript
// Expression bodies
var odds = evens.map(v => v + 1);
var nums = evens.map((v, i) => v + i);

// Statement bodies
nums.forEach(v => {
  if (v % 5 === 0)
    fives.push(v);
});

// Lexical this
var bob = {
  _name: "Bob",
  _friends: [],
  printFriends() {
    this._friends.forEach(f => {
      console.log(this._name + " knows " + f);
    });
  }
};
```

## Async functions ([experimental](usage.md#experimental)) ([spec](https://github.com/lukehoban/ecmascript-asyncawait))

```javascript
async function chainAnimationsAsync(elem, animations) {
  for (var anim of animations) {
    await anim(elem);
  }
}
```

## Classes

```javascript
class SkinnedMesh extends THREE.Mesh {
  constructor(geometry, materials) {
    super(geometry, materials);

    this.idMatrix = SkinnedMesh.defaultMatrix();
    this.bones = [];
    this.boneMatrices = [];
    //...
  }

  update(camera) {
    //...
    super.update();
  }

  static defaultMatrix() {
    return new THREE.Matrix4();
  }
}
```

## Computed property names

```javascript
var foo = "foo";
var bar = "bar";
var obj = {
  ["foo" + bar]: "heh",
  ["bar" + foo]: "noo",
  foo: "foo",
  bar: "bar"
};
```

## Constants

```javascript
const MULTIPLIER = 5;
console.log(2 * MULTIPLIER);

MULTIPLIER = 6; // error
var MULTIPLIER; // error
```

## Default parameters

```javascript
function f(x, y = 12) {
  // y is 12 if not passed (or passed as undefined)
  return x + y;
}
f(3) == 15
```

## Destructuring

```javascript
// list matching
var [a, , b] = [1,2,3];

// object matching
var { op: a, lhs: { op: b }, rhs: c } = getASTNode();

// object matching shorthand
// binds `op`, `lhs` and `rhs` in scope
var { op, lhs, rhs } = getASTNode();

// Can be used in parameter position
function g({ name: x }) {
  console.log(x);
}
g({ name: 5 });

// Fail-soft destructuring
var [a] = [];
a === undefined;
```

## Exponentiation operator ([experimental](usage.md#experimental)) ([spec](https://github.com/rwaldron/exponentiation-operator))

```javascript
var a = 2;
a **= 2;

var squared = 2 ** 2;
```

## For-of

```javascript
for (var i of [1, 2, 3]) {
  console.log(i * i);
}
```

## Generators

```javascript
function* fibonacci() {
  var pre = 0, cur = 1;
  for (;;) {
    var temp = pre;
    pre = cur;
    cur += temp;
    yield cur;
  }
}

for (var n of fibonacci()) {
  // truncate the sequence at 1000
  if (n > 1000) break;
  console.log(n);
}
```

## Generator comprehensions ([experimental](usage.md#experimental))

```javascript
var nums = [1, 2, 3, 4, 5, 6];
var multiples = (for (i of nums) if (i % 2) i * i);
assert.equal(multiples.next().value, 1);
assert.equal(multiples.next().value, 9);
assert.equal(multiples.next().value, 25);
```

## Let scoping

```javascript
for (let i in arr) {
  let v = arr[i];
}
```

## Modules

```javascript
import "foo";
import foo from "foo";
import * as foo from "foo";
import {bar} from "foo";
import {foo as bar} from "foo";

export { test };
export var test = 5;
export function test() {}

export default test;
```

## Numeric literals

```javascript
0b111110111 === 503; // true
0o767 === 503; // true
```

## Property method assignment

```javascript
var obj = {
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
```

## Property name shorthand

```javascript
function f(x, y) {
  return { x, y };
}
```

## Rest parameters

```javascript
function f(x, ...y) {
  // y is an Array
  return x * y.length;
}
f(3, "hello", true) == 6
```

## Spread

```javascript
function f(x, y, z) {
  return x + y + z;
}
// Pass each elem of array as argument
f(...[1,2,3]) == 6
```

## Template literals

```javascript
var x = 5;
var y = 10;
console.log(`${x} + ${y} = ${x + y}`); // "5 + 10 = 15"
```

## Object spread/rest ([experimental](usage.md#experimental)) ([spec](https://github.com/sebmarkbage/ecmascript-rest-spread))

```javascript
var n = { x, y, ...z };
var { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
```

## Unicode regex

```javascript
var string = 'foo💩bar';
var match = string.match(/foo(.)bar/u);
console.log(match[1]);
```
