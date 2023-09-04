function f() {
  var _this = this,
    _ref;
  let g = function g() {
    return (_ref = _ref || babelHelpers.asyncToGenerator(function* () {
      _this;
    })).apply(this, arguments);
  };
}
class Class {
  m() {
    var _this2 = this;
    return babelHelpers.asyncToGenerator(function* () {
      var _ref2;
      var c = function c(_x) {
        return (_ref2 = _ref2 || babelHelpers.asyncToGenerator(function* (b) {
          _this2;
        })).apply(this, arguments);
      };
    })();
  }
}
