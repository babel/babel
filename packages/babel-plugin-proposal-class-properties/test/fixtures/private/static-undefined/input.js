class Foo {
  static #bar;

  static test() {
    return Foo.#bar;
  }

  test() {
    return Foo.#bar;
  }
}

expect("bar" in Foo).toBe(false)
expect(Foo.test()).toBe(undefined)
expect(Foo.test()).toBe(undefined)
