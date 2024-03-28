var _privateMethod = Symbol("privateMethod");
class Foo {
  constructor() {
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
    this.publicField = this[_privateMethod]();
  }
}
function _privateMethod2() {
  return 42;
}
