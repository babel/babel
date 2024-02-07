var _tag = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _tag);
    babelHelpers.classPrivateGetter(this, _tag, _get_tag).bind(this)``;
  }
}
function _get_tag() {
  return () => this;
}
new Foo();
