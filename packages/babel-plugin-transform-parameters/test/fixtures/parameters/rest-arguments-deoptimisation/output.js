function x() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
    rest[_key] = arguments[_key];
  }
  arguments;
}
