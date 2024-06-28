function f() {
  var _this = this;
  let g = /*#__PURE__*/babelHelpers.asyncToGenerator(function* () {
    _this;
  });
}
class Class {
  m() {
    var _this2 = this;
    return babelHelpers.callAsync(function* () {
      var c = function (_x) {
        return babelHelpers.callAsync(function* (b) {
          _this2;
        }, this, arguments);
      };
    });
  }
}
