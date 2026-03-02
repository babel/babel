console.log(class A {
  #foo() {}

  method() {
    this.#foo();
  }
});
