function f(b, _ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  b = 9;
  return arguments[0];
}
function g(c, [d], _ref2) {
  let e = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  arguments[0] = "changed";
  return c;
}
function h(i, _ref3) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  var _arguments = arguments;
  let j = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  return function (i) {
    function i() {}
    return [typeof i, typeof _arguments[0]];
  }(i);
}
function k(l, _ref4) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let m = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref4), _ref4)), []);
  arguments;
  {
    function l() {}
  }
  return typeof l;
}
function n(o, _ref5) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let p = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref5), _ref5)), []);
  arguments;
  return o;
}
