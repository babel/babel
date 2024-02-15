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
    return babelHelpers.assertClassBrand(this, _Sub_brand, _privateMethod).call(this);
  }
}
function _privateMethod() {
  return Base.prototype.superMethod.call(this);
}
