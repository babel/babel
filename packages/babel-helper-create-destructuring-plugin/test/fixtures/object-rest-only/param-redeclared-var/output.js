const _excluded = ["a"];
function f(_ref) {
  let {
      a
    } = _ref,
    r = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return [a, r];
}
