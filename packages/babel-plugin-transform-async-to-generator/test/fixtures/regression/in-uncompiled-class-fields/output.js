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
  b = (_ref2 => {
    var _this2 = this;
    return function () {
      return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* (x, y, z) {
        return _this2;
      })).apply(this, arguments);
    };
  })();
}
