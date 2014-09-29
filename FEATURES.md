# Features

## Arrow functions

```javascript
arr.map(x => x * x);
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

## Default parameters

```javascript
function foo(bar = "foo") {
  return bar + "bar";
}
```

## Spread

```javascript
function add(x, y) {
  return x + y;
}

var numbers = [5, 10]
add(...numbers); // 15
```

## Block binding

```javascript
for (let i in arr) {
  let v = arr[i];
}
```

## Property method assignment

```javascript
var obj = {
  bar: "foobar",

  foo() {
    return "foobar";
  },

  get bar() {

  },

  set bar() {

  }
};
```

## Rest parameters

```javascript
function printList(name, ...items) {
  console.log("list %s has the following items", name);
  items.forEach(function (item) {
    console.log(item);
  });
};
```

## Template literals

```javascript
var x = 5;
var y = 10;
console.log(`${x} + ${y} = ${x + y}`); // "5 + 10 = 15"
```

## Modules

```javascript
```

## Binary and Octal Literals

```javascript
0b111110111 === 503; // true
0o767 === 503; // true
```

## Iterators

```javascript
```

## Constants

```javascript
```

## Computed property names

```javascript
var obj = {
  ["x" + foo]: "heh",
  ["y" + bar]: "noo",
  foo: "foo",
  bar: "bar"
};

```

## Property name shorthand

```javascript
function f(x, y) {
  return { x, y };
}
```

## Array comprehension

```javascript
[for (i of [1, 2, 3]) i * i]; // [1, 4, 9]
```

## Destructuring assignment

```javascript
var [a, [b], c, d] = ["hello", [", ", "junk"], ["world"]];
console.log(a + b + c); // hello, world
```

## Generators

```javascript
```
