class Foo {
  #foo = 0;

  test(other) {
    this.#foo++;
    ++this.#foo;
    other.obj.#foo++;
    ++other.obj.#foo;
    (0, this.#foo++);
    (0, ++this.#foo);
    (0, other.obj.#foo++);
    (0, ++other.obj.#foo);
  }
}
