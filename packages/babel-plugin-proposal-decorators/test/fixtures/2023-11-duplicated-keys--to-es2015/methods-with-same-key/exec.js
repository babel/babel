expect(() => {
  let elements = [];

  function dec(val, context) {
    elements.push({ val, context });
  }

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
}).toThrow("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: a")
