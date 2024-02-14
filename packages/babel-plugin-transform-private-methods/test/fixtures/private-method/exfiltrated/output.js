var exfiltrated;
var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    if (exfiltrated === undefined) {
      exfiltrated = babelHelpers.classPrivateMethodGet(this, _Foo_brand, _privateMethod);
    }
  }
}
function _privateMethod() {}
