var _foo = Symbol("foo");
class Foo {
  constructor() {
    Object.defineProperty(this, _foo, {
      get: _get_foo,
      set: void 0
    });
  }
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
  }
}
function _get_foo() {}
