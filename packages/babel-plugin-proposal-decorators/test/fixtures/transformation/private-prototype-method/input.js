class A {
  @deco prop;

  #foo() {}

  test() {
    this.#foo();
  }
}