var _Foo_brand = /*#__PURE__*/Symbol("foo");
class Foo {
  constructor() {
    Object.defineProperty(this, _Foo_brand, {
      value: _foo
    });
  }
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _Foo_brand);
  }
}
function _foo() {}
