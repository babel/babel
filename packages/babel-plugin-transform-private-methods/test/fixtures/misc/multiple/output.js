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
function _get_getter() {}
function _set_setter(v) {}
function _get_getset() {}
function _set_getset(v) {}
