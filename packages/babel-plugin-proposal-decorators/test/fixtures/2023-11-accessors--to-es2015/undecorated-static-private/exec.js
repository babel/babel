class Foo {
  static accessor #a;

  static accessor #b = 123;

  static getA() {
    return this.#a;
  }

  static setA(v) {
    this.#a = v;
  }

  static getB() {
    return this.#b;
  }

  static setB(v) {
    this.#b = v;
  }
}

expect(Foo.getA()).toBe(undefined);
Foo.setA(123)
expect(Foo.getA()).toBe(123);

expect(Foo.getB()).toBe(123);
Foo.setB(456)
expect(Foo.getB()).toBe(456);
