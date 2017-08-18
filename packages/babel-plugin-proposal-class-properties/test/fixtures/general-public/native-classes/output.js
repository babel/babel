class Foo {
  constructor() {
    Object.defineProperty(this, "bar", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: "bar"
    });
  }

}

Object.defineProperty(Foo, "foo", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: "foo"
});
