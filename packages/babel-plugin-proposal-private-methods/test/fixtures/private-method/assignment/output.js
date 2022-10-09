var _privateMethod = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _privateMethod);
    this.publicField = babelHelpers.classPrivateMethodGet(this, _privateMethod, _privateMethod2).call(this);
  }
}
function _privateMethod2() {
  return 42;
}
