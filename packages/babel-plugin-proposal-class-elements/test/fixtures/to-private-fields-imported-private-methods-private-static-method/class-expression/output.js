console.log(class A {
  static #foo = function () {};

  method() {
    this.#foo();
  }

});
