const _excluded = ["p"];
function rest(_, _ref) {
  var {
      p: _2
    } = _ref,
    q = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return q;
}
