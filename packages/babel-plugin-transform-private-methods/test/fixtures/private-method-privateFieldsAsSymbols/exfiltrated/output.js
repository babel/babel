let exfiltrated;
var _Foo_brand = /*#__PURE__*/Symbol("privateMethod");
class Foo {
  constructor() {
    Object.defineProperty(this, _Foo_brand, {
      value: _privateMethod
    });
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateFieldLooseBase(this, _Foo_brand)[_Foo_brand];
    }
  }
}
function _privateMethod() {}
