var _x = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("x");
class Test {
  static method() {
    const Test = 2;
    const func = () => {
      const Test = 3;
      return babelHelpers.assertClassBrandLoose(this, _x, 1) + Test;
    };
    return func() + Test;
  }
}
Object.defineProperty(Test, _x, {
  writable: true,
  value: 1
});
