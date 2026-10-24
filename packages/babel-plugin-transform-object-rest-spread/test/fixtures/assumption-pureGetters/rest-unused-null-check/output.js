const _excluded = ["unused"];
function f(_ref) {
  var {} = _ref,
    rest = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return rest;
}
