function f(b, _ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let {
    a
  } = _ref;
  b = 9;
  return arguments[0];
}
function g(b) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  arguments[0] = 9;
  return b;
}
function h(b) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  for (var _len = arguments.length, r = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    r[_key - 1] = arguments[_key];
  }
  b = 9;
  return [arguments[0], r];
}
function k(b) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : arguments[0] = 9;
  return b;
}
function m(b) {
  return b;
}
function n(b) {
  let c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return b;
}
function p(b, _ref2) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let {
    a
  } = _ref2;
  arguments;
  {
    function b() {}
  }
  return typeof b;
}
function q(a) {
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return [arguments.length, arguments[0]];
}
