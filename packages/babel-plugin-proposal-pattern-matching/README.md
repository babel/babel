# @babel/plugin-proposal-pattern-matching

> Compile `pattern matching` expressions to ES5

## Detail

Pattern matching is an idea from FP language, it
help you write clean and elegant code.

With pattern matching, you don't need long `if...else...`
in some cases.

```js
let a = match(some) {
  1: "one",
  2: "two",
  3: "three",
  else: "other"
}

// is equivalent to:
let a;
if (some === 1) {
  a = "one";
} else if (some === 2) {
  a = "two";
} else if (some === 3) {
  a = "three";
} else {
  a = "other";
}
```

But the above code is silly, the key
of pattern matching is `pattern matching`:)

```js
let x = [1,2,3];

let that = match(x) {
  []: "zero", // will not match, the length is different
  [1,2]: "first", // will not match too
  [1, two, 3]: "second, value:" + two, // match! two is equivalent to 2
  [1, 2, 3]: "third",
  [1, 3, ...]: "forth",
  [1, 2, ...]: "fifth",
  else: "(^-^)"
}

```

You can match many `pattern` including:

- Literal
  - String
  - Number
  - Boolean
  - Null
- Array
- Object

Here is an example of matching object:

```js
var test = {
    a: 1,
    b: 2,
    c: {
      cc: "hello",
      ccc: " world",
    },
};

let result = match(test) {
  {c: {cc, ...rest}}: cc + rest.ccc,
  else: "foo"
}
```

The value of result should be "hello world".
The plugin support nested matching, you can match
object in object, object in array, array in object, etc.

## References
- [Proposal](https://github.com/tc39/proposal-pattern-matching)
