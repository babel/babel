class Foo {
  constructor() {
    Object.defineProperty(this, "bar", {
      enumerable: true,
      writable: true,
      value: "bar"
    });
  }

}

Object.defineProperty(Foo, "foo", {
  enumerable: true,
  writable: true,
  value: "foo"
});