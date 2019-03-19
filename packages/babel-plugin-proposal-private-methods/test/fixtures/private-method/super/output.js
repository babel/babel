class Base {
  superMethod() {
    return 1017;
  }

}

class Sub extends Base {
  constructor(...args) {
    super(...args);

    _privateMethod.add(this);
  }

  publicMethod() {
    return babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2).call(this);
  }

}

var _privateMethod = new WeakSet();

var _privateMethod2 = function _privateMethod2() {
  return babelHelpers.get(babelHelpers.getPrototypeOf(this), "superMethod", this).call(this);
};
