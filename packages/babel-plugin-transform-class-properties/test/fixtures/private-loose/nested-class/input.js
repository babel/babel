class Foo {
  #foo = 1;

  test() {
    class Nested {
      test() {
        this.#foo;
      }
    }

    this.#foo;
  }
}
