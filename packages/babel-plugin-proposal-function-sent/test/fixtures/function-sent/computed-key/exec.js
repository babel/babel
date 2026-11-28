function* g() {
  var first = function.sent;
  class A {
    [yield 1]() {}
    [function.sent + "2"]() {}
  }
  return [first, Object.getOwnPropertyNames(A.prototype)];
}

var it = g();
expect(it.next("a")).toEqual({ value: 1, done: false });
expect(it.next("b")).toEqual({
  value: ["a", ["constructor", "b", "b2"]],
  done: true,
});
