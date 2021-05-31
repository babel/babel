var value1, value2 = {};

function makeStatic(el) {
  el.placement = "static";
  return el;
}

function defineBar(el) {
  el.extras = [{
    key: "bar",
    kind: "method",
    placement: "prototype",
    descriptor: {
      value: value2,
    },
  }];
  return el;
}

function storeValue(el) {
  value1 = el.descriptor.value;
  return el;
}

class Foo {
  @defineBar
  @makeStatic
  @storeValue
  bar() {}
}

expect(Foo.bar).toBe(value1);
expect(Foo.prototype.bar).toBe(value2);
