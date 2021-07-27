var _outer = /*#__PURE__*/new WeakMap();

class Outer {
  constructor() {
    _outer.set(this, void 0);

    class Test extends babelHelpers.classPrivateFieldGet2(this, _outer) {}
  }

}
