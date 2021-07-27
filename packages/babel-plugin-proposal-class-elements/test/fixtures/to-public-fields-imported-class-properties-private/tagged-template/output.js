var _tag = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _tag.set(this, void 0);
  }

  test() {
    babelHelpers.classPrivateFieldGet2(this, _tag).bind(this)``;
  }

}

new Foo();
