function f() {
  var _this = this;
  let g = /*#__PURE__*/function () {
    var _g = babelHelpers.asyncToGenerator(function* () {
      _this;
    });
    function g() {
      return _g.apply(this, arguments);
    }
    return g;
  }();
}
class Class {
  m() {
    var _this2 = this;
    return babelHelpers.asyncToGenerator(function* () {
      var c = /*#__PURE__*/function () {
        var _c = babelHelpers.asyncToGenerator(function* (b) {
          _this2;
        });
        function c(_x) {
          return _c.apply(this, arguments);
        }
        return c;
      }();
    })();
  }
}
