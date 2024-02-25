var _A_brand = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
    babelHelpers.assertClassBrand(_A_brand, this, _method).call(this);
    babelHelpers.classPrivateGetter(_A_brand, this, _get_getter);
    babelHelpers.classPrivateSetter(_A_brand, _set_setter, this, 1);
    babelHelpers.classPrivateGetter(_A_brand, this, _get_getset);
    babelHelpers.classPrivateSetter(_A_brand, _set_getset, this, 2);
  }
}
function _method() {}
function _get_getter(_this) {}
function _set_setter(_this2, v) {}
function _get_getset(_this3) {}
function _set_getset(_this4, v) {}
