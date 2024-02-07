var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
class Test {
  static method() {
    const Test = 2;
    const func = () => {
      const Test = 3;
      return babelHelpers.classPrivateFieldLooseBase(this, _x)[_x] + Test;
    };
    return func() + Test;
  }
}
Object.defineProperty(Test, _x, {
  writable: true,
  value: 1
});
