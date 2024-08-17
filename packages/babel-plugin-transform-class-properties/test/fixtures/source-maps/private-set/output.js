var _field = /*#__PURE__*/new WeakMap();
var _A_brand = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
    babelHelpers.classPrivateFieldInitSpec(this, _field, void 0);
  }
  method() {
    babelHelpers.classPrivateFieldSet2(_field, this, 42);
    babelHelpers.classPrivateSetter(_A_brand, _set_setter, this, 43);
    inExpr(babelHelpers.classPrivateFieldSet2(_field, this, 5));
  }
}
function _set_setter(_this, value) {}
