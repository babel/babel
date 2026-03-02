var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    this.publicField = babelHelpers.assertClassBrand(_Foo_brand, this, _privateMethod).call(this);
  }
}
function _privateMethod() {
  return 42;
}
