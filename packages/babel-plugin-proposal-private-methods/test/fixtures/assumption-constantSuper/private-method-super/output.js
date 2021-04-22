class Base {
  superMethod() {
    return 'good';
  }

}

var _privateMethod = /*#__PURE__*/new WeakSet();

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

function _privateMethod2() {
  return Base.prototype.superMethod.call(this);
}
