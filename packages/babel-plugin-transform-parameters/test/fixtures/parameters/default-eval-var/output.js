function f() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  eval("var a = 2");
  return a;
}
function g() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  eval("function a() {}");
  return typeof a;
}
function h() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var [a] = _ref;
  eval("var a = 3");
  return a;
}
function k(_ref2) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let [a] = _ref2;
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  return (() => eval("var a = 4, b = 4"))(), [a, b];
}
function m() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  return function (a) {
    var a = 0;
    eval("var a = 5");
    return a;
  }(a);
}
