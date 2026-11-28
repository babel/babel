function f(read = function (_this) {
  return function () {
    return _this;
  };
}(this)) {
  return read();
}
