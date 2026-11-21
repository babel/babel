// The elements of `arguments` are called with `arguments` as `this`
function f(fn, b, _ref) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  arguments[0]();
  return b;
}
function g(fn, b, _ref2) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  arguments[0]?.();
  return b;
}
function h(fn, b, _ref3) {
  arguments = function () {
    "use strict";

    return arguments;
  }.apply(void 0, arguments);
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  arguments[0]``;
  return b;
}

// A computed key is only read
function i(a, _ref4) {
  let r = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref4), _ref4)), []);
  ({
    [arguments[0]]: r
  } = {});
}
