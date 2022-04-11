class Foo {
  #foo = 1;

  test() {
    class Nested {
      #foo = 2;

      test() {
        this.#foo;
      }
    }

    this.#foo;
  }
}
