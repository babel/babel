class Foo {
  #foo = 1;

  test() {
    class Nested {
      [this.#foo]() {
      }
    }

    return new Nested();
  }
}

const f = new Foo();
expect(() => {
  f.test();
}).not.toThrow();
