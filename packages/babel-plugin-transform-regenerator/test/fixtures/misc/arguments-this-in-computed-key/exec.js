function* g() {
  var o = {
    [arguments[0]]() {},
    [this.k]() {}
  };
  yield o;
}

var o = g.call({ k: "b" }, "a").next().value;
expect(Object.keys(o)).toEqual(["a", "b"]);
