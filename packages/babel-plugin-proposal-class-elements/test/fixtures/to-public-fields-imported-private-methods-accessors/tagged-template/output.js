var _tag = /*#__PURE__*/new WeakSet();

class Foo {
  constructor() {
    _tag.add(this);

    babelHelpers.classPrivateAccessorGet2(this, _tag, _get_tag).bind(this)``;
  }

}

function _get_tag() {
  return () => this;
}

new Foo();
