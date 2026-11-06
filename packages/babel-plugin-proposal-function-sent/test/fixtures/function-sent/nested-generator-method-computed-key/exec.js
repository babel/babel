"use strict";

function* g() {
  var o = {
    *[yield function.sent]() {
      yield function.sent;
    }
  };
  return [Object.keys(o), o.b];
}

var it = g();
expect(it.next("a")).toEqual({ value: "a", done: false });
var { value: [keys, method] } = it.next("b");
expect(keys).toEqual(["b"]);
var inner = method();
expect(inner.next("c")).toEqual({ value: "c", done: false });
expect(inner.next("d")).toEqual({ value: undefined, done: true });
