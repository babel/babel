class Foo {
  constructor() {
    _privateMethod.add(this);

    this.publicField = babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2).call(this);
  }

}

var _privateMethod = new WeakSet();

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
