function f(read = function (_this) {
  return function () {
    babelHelpers.newArrowCheck(this, _this);
    return this;
  }.bind(_this);
}(this)) {
  return read();
}
