var _Sub;
class Base {
  superMethod() {
    return 'good';
  }
}
var _Sub_brand = /*#__PURE__*/Symbol("privateMethod");
class Sub extends Base {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, _Sub_brand, {
      value: _privateMethod
    });
  }
  superMethod() {
    return 'bad';
  }
  publicMethod() {
    return babelHelpers.classPrivateFieldLooseBase(this, _Sub_brand)[_Sub_brand]();
  }
}
_Sub = Sub;
function _privateMethod() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_Sub.prototype), "superMethod", this).call(this);
}
