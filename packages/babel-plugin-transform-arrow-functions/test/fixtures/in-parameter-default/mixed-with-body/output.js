function f(read = function (_arguments, _this) {
  return function () {
    return [_this, _arguments];
  };
}(arguments, this)) {
  var _arguments2 = arguments,
    _this2 = this;
  return [read, function () {
    return [_this2, _arguments2];
  }];
}
