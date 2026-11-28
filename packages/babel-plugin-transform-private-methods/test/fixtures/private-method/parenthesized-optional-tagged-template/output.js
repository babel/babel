var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
  }
}
function _tag() {
  (this === null || this === void 0 ? void 0 : babelHelpers.assertClassBrand(_Foo_brand, this, _tag).bind(this))``;
}
new Foo();
