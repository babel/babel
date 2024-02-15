var _A_brand = /*#__PURE__*/new WeakSet();
class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
    babelHelpers.assertClassBrand(this, _A_brand, _method).call(this);
    babelHelpers.classPrivateGetter(this, _A_brand, _get_getter);
    babelHelpers.classPrivateSetter(this, _A_brand, _set_setter, 1);
    babelHelpers.classPrivateGetter(this, _A_brand, _get_getset);
    babelHelpers.classPrivateSetter(this, _A_brand, _set_getset, 2);
  }
}
function _method() {}
function _get_getter() {}
function _set_setter(v) {}
function _get_getset() {}
function _set_getset(v) {}
