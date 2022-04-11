class Foo {
  #foo = 1;

  test() {
    class Nested extends class {
      [this.#foo] = 2;
    } {
      #foo = 3;
    }
  }
}
