class Test {
  method(other) {
    const _Test2 = 2;
    const func = () => {
      const _Test = 3;
      return babelHelpers.checkInRHS(other) === Test && _Test;
    };
    return func() + _Test2;
  }
}
var _x = {
  _: 1
};
