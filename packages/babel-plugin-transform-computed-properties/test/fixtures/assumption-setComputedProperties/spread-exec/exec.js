var sym = Symbol();
var first = { a: 1, b: 1 };
var second = { b: 2, c: 2 };
var third = { c: 3, [sym]: 3 };

var obj = {
  ...first,
  c: 0,
  ["b"]: 0,
  ...second,
  ...third,
  ...null,
  ["a"]: 5,
};

expect(obj).toEqual({ a: 5, b: 2, c: 3, [sym]: 3 });
expect(Object.keys(obj)).toEqual(["a", "b", "c"]);
