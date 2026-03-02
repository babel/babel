class Foo {
  static #foo = function(x) {
    return x;
  }

  test(x) {
    return Foo.#foo(x);
  }
}

const f = new Foo;
const test = f.test();
expect(f.test("bar")).toBe("bar");
