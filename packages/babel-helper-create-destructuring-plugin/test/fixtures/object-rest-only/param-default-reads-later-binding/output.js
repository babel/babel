const _excluded = ["b", "a"],
  _excluded2 = ["b", "a"],
  _excluded3 = ["b", "a"];
function f(_ref) {
  let {
      b = a,
      a
    } = _ref,
    r = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return [b, a, r];
}
function g(..._ref2) {
  let {
      b = a,
      a
    } = _ref2,
    r = babelHelpers.objectWithoutProperties(_ref2, _excluded2);
  return [b, a, r];
}
function h(_ref3) {
  let s = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(_ref3), _ref3)), []);
  let c = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : s;
  for (var _len = arguments.length, _ref4 = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _ref4[_key - 2] = arguments[_key];
  }
  let {
      b = a,
      a
    } = _ref4,
    r = babelHelpers.objectWithoutProperties(_ref4, _excluded3);
  return [s, c, b, a, r];
}
