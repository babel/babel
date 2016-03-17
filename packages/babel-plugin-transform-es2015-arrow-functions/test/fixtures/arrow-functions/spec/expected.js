function foo() {
  var _this = this;

  arr.map(function (x) {
    babelHelpers.newArrowCheck(this, _this);
    return x * x;
  }.bind(this));
  var f = function (x, y) {
    babelHelpers.newArrowCheck(this, _this);
    return x * y;
  }.bind(this);
  (function () {
    var _this2 = this;

    return function () {
      babelHelpers.newArrowCheck(this, _this2);
      return this;
    }.bind(this);
  })();
}
