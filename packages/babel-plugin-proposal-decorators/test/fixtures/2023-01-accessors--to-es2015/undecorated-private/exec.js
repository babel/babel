class Foo {
  accessor #a;

  accessor #b = 123;

  getA() {
    return this.#a;
  }

  setA(v) {
    this.#a = v;
  }

  getB() {
    return this.#b;
  }

  setB(v) {
    this.#b = v;
  }
}

let foo = new Foo();

expect(foo.getA()).toBe(undefined);
foo.setA(123)
expect(foo.getA()).toBe(123);

expect(foo.getB()).toBe(123);
foo.setB(456)
expect(foo.getB()).toBe(456);
