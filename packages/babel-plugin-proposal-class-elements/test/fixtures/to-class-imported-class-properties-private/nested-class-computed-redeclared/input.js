class Foo {
  #foo = 1;

  test() {
    class Nested {
      #foo = 2;

      [this.#foo]() {
      }
    }

    this.#foo;
  }
}
