var _class;
class Base {
  superMethod() {
    return 'good';
  }
}
var _privateMethod = /*#__PURE__*/Symbol("privateMethod");
class Sub extends Base {
  constructor(...args) {
    super(...args);
    Object.defineProperty(this, _privateMethod, {
      value: _privateMethod2
    });
  }
  superMethod() {
    return 'bad';
  }
  publicMethod() {
    return babelHelpers.classPrivateFieldLooseBase(this, _privateMethod)[_privateMethod]();
  }
}
_class = Sub;
function _privateMethod2() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(_class.prototype), "superMethod", this).call(this);
}
