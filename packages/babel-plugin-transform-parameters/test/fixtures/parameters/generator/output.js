function fn(_a, _ref) {
  var _arguments = arguments,
    _this = this;
  var a = _a;
  let [] = _ref;
  let b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  return function* () {
    yield a;
    yield _arguments;
    yield _this;
    return b;
  }();
}
