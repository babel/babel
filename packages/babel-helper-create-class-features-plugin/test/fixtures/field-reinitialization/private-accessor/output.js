class Base {
  constructor(obj) {
    return obj;
  }
}
var _Derived_brand = /*#__PURE__*/new WeakSet();
class Derived extends Base {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateMethodInitSpec(this, _Derived_brand);
  }
  static get(obj) {
    return babelHelpers.classPrivateGetter(_Derived_brand, obj, _get_foo).call(obj);
  }
}
function _get_foo(_this) {
  return 'bar';
}
function _set_foo(_this2, value) {
  babelHelpers.classPrivateSetter(_Derived_brand, _set_foo, _this2, value);
}
