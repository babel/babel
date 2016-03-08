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
