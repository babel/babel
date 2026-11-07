// `length` is not mapped: `arguments` doesn't need to be unmapped
function f(a, _ref) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  a = 2;
  return [arguments.length, arguments["length"]];
}

// `callee` throws when `arguments` is unmapped
function g(a, _ref2) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  return arguments["callee"];
}
function h(a, _ref3) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  a = 2;
  return arguments["0"];
}
