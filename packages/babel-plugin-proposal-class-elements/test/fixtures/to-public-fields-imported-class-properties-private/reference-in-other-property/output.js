var _two = /*#__PURE__*/new WeakMap(),
    _private = /*#__PURE__*/new WeakMap(),
    _four = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _four.set(this, babelHelpers.classPrivateFieldGet2(this, _private));
  }

  one = babelHelpers.classPrivateFieldGet2(this, _private);
  three = (_two.set(this, babelHelpers.classPrivateFieldGet2(this, _private)), _private.set(this, 0), babelHelpers.classPrivateFieldGet2(this, _private));
}
