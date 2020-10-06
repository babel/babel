class Foo extends class extends class Base {
  static #_3 = (() => {
    this.qux = 21;
  })();
} {
  static #_2 = (() => {
    this.bar = 21;
  })();
} {
  static #_ = (() => {
    this.foo = this.bar + this.qux;
  })();
}

expect(Foo.foo).toBe(42);
