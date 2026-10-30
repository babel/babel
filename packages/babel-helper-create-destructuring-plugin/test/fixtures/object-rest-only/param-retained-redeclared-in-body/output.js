function f(_ref, read = () => value, value) {
  let rest = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  let last = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : value;
  return function (value) {
    var value;
    value = 2;
    return [read(), last];
  }(value);
}
function g(_ref2, read = () => value, value, last = 5) {
  let rest = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  var value;
  value = 2;
  return [read(), last];
}
