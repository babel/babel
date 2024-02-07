class Test {
  static method() {
    const _Test2 = 2;
    const func = () => {
      const _Test = 3;
      return babelHelpers.assertClassBrand(this, Test, _x)._ + _Test;
    };
    return func() + _Test2;
  }
}
var _x = {
  _: 1
};
