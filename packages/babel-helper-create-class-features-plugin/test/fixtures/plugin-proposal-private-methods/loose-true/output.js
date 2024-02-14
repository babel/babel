var _privateMethod = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateMethod");
var _privateMethod3 = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateMethod2");
class X {
  constructor() {
    Object.defineProperty(this, _privateMethod3, {
      value: _privateMethod4
    });
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
  }
}
function _privateMethod2() {
  return 42;
}
function _privateMethod4() {
  return 42;
}
