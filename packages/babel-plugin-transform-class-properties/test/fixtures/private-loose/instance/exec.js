class Foo {
  #bar = "foo";

  test() {
    return this.#bar;
  }

  static test(foo) {
    return foo.#bar;
  }
}

const f = new Foo();
expect(f.test()).toBe("foo");
expect(Foo.test(f)).toBe("foo");
expect("bar" in f).toBe(false);
