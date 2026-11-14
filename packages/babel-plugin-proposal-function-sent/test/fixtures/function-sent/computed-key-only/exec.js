function* g() {
  class A {
    [function.sent]() {}
  }
  var o = {
    *[yield function.sent]() {
      yield function.sent;
    }
  };
  return [Object.getOwnPropertyNames(A.prototype), Object.keys(o)];
}

var it = g();
expect(it.next("a")).toEqual({ value: "a", done: false });
expect(it.next("b")).toEqual({
  value: [["constructor", "a"], ["b"]],
  done: true,
});
