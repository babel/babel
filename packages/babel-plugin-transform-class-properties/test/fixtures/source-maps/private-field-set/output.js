var _field = /*#__PURE__*/new WeakMap();
class A {
  constructor() {
    babelHelpers.classPrivateFieldInitSpec(this, _field, void 0);
  }
  method() {
    babelHelpers.classPrivateFieldSet2(_field, this, 42);
  }
}
