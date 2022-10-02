var _this = this;
var bar = "bar";
var x = function x() {
  babelHelpers.newArrowCheck(this, _this);
  return "foo".concat(bar);
}.bind(this);
