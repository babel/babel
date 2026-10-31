function redeclared(a) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments = arguments;
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  return function (a) {
    function a() {}
    return [b, _arguments[0]];
  }(a);
}
function restRedeclared(a) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments2 = arguments;
  return function (a) {
    for (var _len = _arguments2.length, r = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      r[_key - 1] = _arguments2[_key];
    }
    function a() {}
    return [typeof a, _arguments2[0], r];
  }(a);
}
function evalVar(a) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  for (var _len2 = arguments.length, r = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    r[_key2 - 1] = arguments[_key2];
  }
  eval("var a = 2");
  return [a, arguments[0], r];
}
function evalBlock(a) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  for (var _len3 = arguments.length, r = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    r[_key3 - 1] = arguments[_key3];
  }
  eval("");
  {
    function a() {}
  }
  return [typeof a, arguments[0], r];
}
function callee() {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return arguments;
}
function calleeIIFE(a) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments3 = arguments;
  let b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a;
  return function (a) {
    function a() {}
    return _arguments3;
  }(a);
}
function shadowedArguments(arguments, _ref) {
  var {
    a
  } = _ref;
  eval("");
  return arguments;
}
function bodyArguments(a, _ref2) {
  let {
    b
  } = _ref2;
  function arguments() {}
  return typeof arguments;
}
function lexicalArguments(a, _ref3) {
  var {
    b
  } = _ref3;
  const arguments = 7;
  eval("");
  return arguments;
}
