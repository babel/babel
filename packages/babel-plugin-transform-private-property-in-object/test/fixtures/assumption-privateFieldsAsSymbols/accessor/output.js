var _Foo_brand = /*#__PURE__*/Symbol("foo");
class Foo {
  constructor() {
    Object.defineProperty(this, _Foo_brand, {
      get: _get_foo,
      set: void 0
    });
  }
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _Foo_brand);
  }
}
function _get_foo() {}
