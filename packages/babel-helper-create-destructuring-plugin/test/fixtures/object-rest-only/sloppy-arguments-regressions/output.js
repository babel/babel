function redeclared(a, _ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments = arguments;
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  let b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : a;
  return function (a) {
    function a() {}
    return [b, _arguments[0]];
  }(a);
}
function bodyFunction(a, _ref2) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments2 = arguments;
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  return function (a) {
    function a() {}
    return [typeof a, _arguments2[0], r];
  }(a);
}
function evalVar(a, _ref3) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  eval("var a = 2");
  return [a, arguments[0], r];
}
function evalBlock(a, _ref4) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref4), _ref4)), []);
  eval("");
  {
    function a() {}
  }
  return [typeof a, arguments[0], r];
}
function callee(_ref5) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref5), _ref5)), []);
  return arguments;
}
function calleeIIFE(a, _ref6) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments3 = arguments;
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref6), _ref6)), []);
  return function (a) {
    function a() {}
    return _arguments3;
  }(a);
}
function shadowedArguments(arguments, _ref7) {
  var r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref7), _ref7)), []);
  eval("");
  return arguments;
}
function bodyArguments(a, _ref8) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref8), _ref8)), []);
  function arguments() {}
  return typeof arguments;
}
function lexicalArguments(a, _ref9) {
  var r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref9), _ref9)), []);
  const arguments = 7;
  eval("");
  return arguments;
}
