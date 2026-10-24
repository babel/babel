const _excluded = ["a"];
function f(_ref) {
  let a = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_ref), _ref));
  let _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : a,
    b = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_ref2), _ref2));
}
function g(_ref3, _ref4) {
  let {
      a
    } = _ref3,
    r = babelHelpers.objectWithoutProperties(_ref3, _excluded);
  let {
      [a]: b
    } = _ref4,
    s = babelHelpers.objectWithoutProperties(_ref4, [a].map(babelHelpers.toPropertyKey));
}
