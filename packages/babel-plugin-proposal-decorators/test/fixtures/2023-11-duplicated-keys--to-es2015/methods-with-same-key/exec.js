let elements = [];

function dec(val, context) {
  elements.push(val);
}

expect(() => {
  class Foo {
    @dec
    a() {
      return 1;
    }

    @dec
    a() {
      return 2;
    }
  }
}).toThrow("Decorating two elements with the same name");

