var exfiltrated;
var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.assertClassBrand(_Foo_brand, this, _privateMethod);
    }
  }
}
function _privateMethod() {}
