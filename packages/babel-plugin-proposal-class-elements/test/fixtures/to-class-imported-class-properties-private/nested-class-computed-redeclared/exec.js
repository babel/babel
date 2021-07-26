class Foo {
  #foo = 1;

  test() {
    class Nested {
      #foo = 2;

      [this.#foo]() {
      }
    }

    return new Nested();
  }
}

const f = new Foo();
expect(() => {
  f.test();
}).toThrow();
