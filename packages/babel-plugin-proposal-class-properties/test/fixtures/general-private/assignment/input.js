class Foo {
  #foo = 0;

  test(other) {
    this.#foo += 1;
    this.#foo = 2;
    other.obj.#foo += 1;
    other.obj.#foo = 2;
  }
}
