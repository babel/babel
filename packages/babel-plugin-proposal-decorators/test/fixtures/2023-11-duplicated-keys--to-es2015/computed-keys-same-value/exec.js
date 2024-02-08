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

expect(() => {
  class Foo {
    @dec
    [getKey()]() {
      return 1;
    }

    @dec
    get [getKey()]() {
      return 2;
    }
  }
}).toThrow("Decorating two elements with the same name");

expect(() => {
  class Foo {
    @dec
    [getKey()]() {
      return 1;
    }

    @dec
    set [getKey()](_) {
      return 2;
    }
  }
}).toThrow("Decorating two elements with the same name");

expect(() => {
  class Foo {
    @dec
    *[Symbol.iterator]() {
      return 1;
    }

    @dec
    get [Symbol.iterator]() {
      return function *() {};
    }
  }
}).toThrow("Decorating two elements with the same name (get [Symbol.iterator]) is not supported yet");

expect(() => {
  class Foo {
    @dec
    *[Symbol.iterator]() {}

    @dec
    *[Symbol("Symbol.iterator")]() {}

    @dec
    *"[Symbol.iterator]"() {}
  }
}).not.toThrow();
