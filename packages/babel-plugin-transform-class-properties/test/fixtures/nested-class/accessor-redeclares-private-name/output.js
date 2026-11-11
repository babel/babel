var _x = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _x, 1);
  }
  m() {
    return class B {
      accessor #x = 2;
      g() {
        return this.#x;
      }
    };
  }
}
