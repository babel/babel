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
    return babelHelpers.classPrivateGetter(obj, _Derived_brand, _get_foo).call(obj);
  }
}
function _get_foo() {
  return 'bar';
}
function _set_foo(value) {
  babelHelpers.classPrivateSetter(this, _Derived_brand, _set_foo, value);
}
