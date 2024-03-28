class Base {
  superMethod() {
    return 'good';
  }
}
var _privateMethod = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("privateMethod");
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
    return this[_privateMethod]();
  }
}
function _privateMethod2() {
  return Base.prototype.superMethod.call(this);
}
