var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateGetter(_Foo_brand, this, _get_tag).bind(this)``;
  }
}
function _get_tag(_this) {
  return () => _this;
}
new Foo();
