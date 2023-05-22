class Test {
  static method() {
    const _Test2 = 2;
    const func = () => {
      const _Test = 3;
      return babelHelpers.classStaticPrivateFieldSpecGet(this, Test, _x) + _Test;
    };
    return func() + _Test2;
  }
}
var _x = {
  writable: true,
  value: 1
};
