var _privateMethod;

class Foo {
  #privateMethod = _privateMethod ||= function () {
    return 42;
  };

  constructor() {
    this.publicField = this.#privateMethod();
  }

}
