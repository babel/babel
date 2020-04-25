class Base {
  superMethod() {
    return 'good';
  }

}

class Sub extends Base {
  constructor(...args) {
    super(...args);

    _privateMethod.add(this);
  }

  superMethod() {
    return 'bad';
  }

  publicMethod() {
    return babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2).call(this);
  }

}

var _privateMethod = new WeakSet();

var _privateMethod2 = function _privateMethod2() {
  var _thisSuper;

  return babelHelpers.get((_thisSuper = this, babelHelpers.getPrototypeOf(Sub.prototype)), "superMethod", _thisSuper).call(_thisSuper);
};
