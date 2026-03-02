class Foo {
  #foo = 1;

  test() {
    class Nested {
      [this.#foo]() {
      }
    }

    this.#foo;
  }
}
