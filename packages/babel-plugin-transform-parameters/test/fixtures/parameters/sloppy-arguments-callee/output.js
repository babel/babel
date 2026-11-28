function f() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return arguments.callee;
}
function g() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  for (var _len = arguments.length, r = new Array(_len), _key = 0; _key < _len; _key++) {
    r[_key] = arguments[_key];
  }
  return arguments["callee"];
}
function h(_ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let [a] = _ref;
  return typeof arguments.callee;
}
function k() {
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return [arguments.length, arguments[0]];
}
