console.log(class A {
  static #foo() {}

  method() {
    this.#foo();
  }
});
