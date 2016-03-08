function f() {
  var _this = this;

  let g = function () {
    var ref = babelHelpers.asyncToGenerator(function* () {
      _this;
    });
    return function g() {
      return ref.apply(this, arguments);
    };
  }();
};

class Class {
  m() {
    var _this2 = this;

    return babelHelpers.asyncToGenerator(function* () {
      var c = function () {
        var ref = babelHelpers.asyncToGenerator(function* (b) {
          _this2;
        });
        return function c(_x) {
          return ref.apply(this, arguments);
        };
      }();
    })();
  }
}
