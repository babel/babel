function *gen(fn) {
  return {
    a: yield "a",
    b: yield "b",
    c: fn(yield "c", yield "d"),
    d: [yield "e", yield "f"]
  };
}

genHelpers.check(gen(function sum(x, y) {
  return x + y;
}), ["a", "b", "c", "d", "e", "f"], {
  a: 1,
  b: 2,
  c: 3 + 4,
  d: [5, 6]
});
