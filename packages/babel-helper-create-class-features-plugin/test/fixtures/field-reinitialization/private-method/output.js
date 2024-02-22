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
    return babelHelpers.assertClassBrand(_Derived_brand, obj, _foo).call(obj);
  }
}
function _foo() {
  return 'bar';
}
