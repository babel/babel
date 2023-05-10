class Foo {
  #foo = 1;
  #bar = 1;

  test() {
    class Nested {
      #bar = 2;

      test() {
        this.#foo;
        this.#bar;
      }
    }

    this.#foo;
    this.#bar;
  }
}
