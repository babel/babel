class A {
  #foo = "bar";
  static #bar = foo;

  method() {
    this.#foo;
  }
}
