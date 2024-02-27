var _Sub;
class Base {
  superMethod() {
    return 'good';
  }
}
var _Sub_brand = /*#__PURE__*/new WeakSet();
class Sub extends Base {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateMethodInitSpec(this, _Sub_brand);
  }
  superMethod() {
    return 'bad';
  }
  publicMethod() {
    return babelHelpers.assertClassBrand(_Sub_brand, this, _privateMethod).call(this);
  }
}
_Sub = Sub;
function _privateMethod() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_Sub.prototype), "superMethod", this).call(this);
}
