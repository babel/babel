var _privateMethod = /*#__PURE__*/new WeakSet();

class Foo {
  constructor() {
    _privateMethod.add(this);

    this.publicField = babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2).call(this);
  }

}

function _privateMethod2() {
  return 42;
}
