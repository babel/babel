function f(_b, _ref) {
  var b = _b;
  var a = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref), _ref)), []);
  b = 9;
  return arguments[0];
}
function g(c, [d], _ref2) {
  var e = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref2), _ref2)), []);
  arguments[0] = "changed";
  return c;
}
function h(_i, _ref3) {
  var i;
  var j = babelHelpers.objectWithoutProperties(babelHelpers.extends(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  function i() {}
  return [typeof i, typeof arguments[0]];
}
