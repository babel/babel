# Features

## Array comprehension

```javascript
[for (i of [1, 2, 3]) i * i]; // [1, 4, 9]
```

## Async functions

```javascript
async function chainAnimationsAsync(elem, animations) {
  for (var anim of animations) {
    await anim(elem);
  }
}
```

## Arrow functions

```javascript
arr.map(x => x * x);
```

## Let scoping

```javascript
for (let i in arr) {
  let v = arr[i];
}
```

## Classes

```javascript
class Foo extends Bar {
  constructor() { }

  foo() { }

  get bar() { }

  set bar() { }
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
function foo(bar = "foo") {
  return bar + "bar";
}
```

## Destructuring

```javascript
var [a, [b], c, d] = ["hello", [", ", "junk"], ["world"]];
console.log(a + b + c); // hello, world
```

## For-of

```javascript
for (var i of [1, 2, 3]) {
  console.log(i * i);
}
```

## Generators

```javascript
```

## Modules

```javascript
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
function printList(name, ...items) {
  console.log("list %s has the following items", name);
  items.forEach(function (item) {
    console.log(item);
  });
}
```

## Spread

```javascript
function add(x, y) {
  return x + y;
}

var numbers = [5, 10];
add(...numbers); // 15
```

## Template literals

```javascript
var x = 5;
var y = 10;
console.log(`${x} + ${y} = ${x + y}`); // "5 + 10 = 15"
```

## Unicode regex

```javascript
var string = 'foo💩bar';
var match = string.match(/foo(.)bar/u);
console.log(match[1]);
```
