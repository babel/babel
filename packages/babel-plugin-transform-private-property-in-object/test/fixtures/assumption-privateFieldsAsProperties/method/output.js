var _foo = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo");
var _foo3 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("foo2");
class Foo {
  constructor() {
    Object.defineProperty(this, _foo3, {
      value: _foo4
    });
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }
  test(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo);
  }
  test2(other) {
    return Object.prototype.hasOwnProperty.call(babelHelpers.checkInRHS(other), _foo3);
  }
}
function _foo2() {}
function _foo4() {}
