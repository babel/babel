function fn(a, _ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments = arguments,
    _this = this;
  let [] = _ref;
  let b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
  return function* () {
    yield a;
    yield _arguments;
    yield _this;
    return b;
  }();
}
