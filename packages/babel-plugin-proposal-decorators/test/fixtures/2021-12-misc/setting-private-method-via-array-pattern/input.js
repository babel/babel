class Foo {
  @dec #x() {}

  bar() {
    ([this.#x] = this.baz);
  }
}
