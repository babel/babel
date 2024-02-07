function getKey() {
  return eval("0")
}

let elements = [];

function dec(fn, context) {
  elements.push(fn);
}

expect(() => {
  class Foo {
    @dec
    [getKey()]() {
      return 1;
    }

    @dec
    [getKey()]() {
      return 2;
    }
  }
}).toThrow("Decorating two elements with the same name");

