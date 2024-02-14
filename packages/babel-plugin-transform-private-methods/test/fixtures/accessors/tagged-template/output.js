var _Foo_brand = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _Foo_brand);
    babelHelpers.classPrivateGetter(this, _Foo_brand, _get_tag).bind(this)``;
  }
}
function _get_tag() {
  return () => this;
}
new Foo();
