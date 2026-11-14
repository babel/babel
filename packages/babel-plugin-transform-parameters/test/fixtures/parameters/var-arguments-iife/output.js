function f() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return function* (_arguments) {
    var _arguments;
    yield _arguments;
  }(arguments);
}
