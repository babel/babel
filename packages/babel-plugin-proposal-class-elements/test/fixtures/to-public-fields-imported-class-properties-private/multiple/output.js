var _x = /*#__PURE__*/new WeakMap(),
    _y = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _x.set(this, 0);

    _y.set(this, babelHelpers.classPrivateFieldGet2(this, _x));
  }

}
