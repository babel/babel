var _field = /*#__PURE__*/new WeakMap();
var _A_brand = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _field, void 0);
  }
  method() {
    babelHelpers.classPrivateFieldGet2(_field, this);
    babelHelpers.classPrivateGetter(_A_brand, this, _get_getter);
    babelHelpers.assertClassBrand(_A_brand, this, _method);
    inExpr(babelHelpers.classPrivateFieldGet2(_field, this));
  }
}
function _get_getter(_this) {}
function _method() {}
