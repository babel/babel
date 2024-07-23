var _Sub;
class Base {
  superMethod() {
    return 'good';
  }
}
var _privateMethod = Symbol("privateMethod");
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
_Sub = Sub;
function _privateMethod2() {
  return babelHelpers.superPropGet(_Sub.prototype, "superMethod", this, 2)([]);
}
