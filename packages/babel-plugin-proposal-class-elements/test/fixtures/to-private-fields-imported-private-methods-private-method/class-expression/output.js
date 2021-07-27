var _foo;

console.log(class A {
  #foo = _foo ||= function () {};

  method() {
    this.#foo();
  }

});
