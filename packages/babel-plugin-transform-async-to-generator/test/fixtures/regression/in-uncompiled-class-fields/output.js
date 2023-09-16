// Angular needs to always compile async functions, even if
// the targets support class fields.
// https://github.com/babel/babel/issues/14749

class A {
  a = (() => {
    var _this = this;
    return babelHelpers.asyncToGenerator(function* () {
      return _this;
    });
  })();
  b = (() => {
    var _this2 = this;
    return function () {
      var _ref2 = babelHelpers.asyncToGenerator(function* (x, y, z) {
        return _this2;
      });
      return function (_x, _x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();
  })();
}
