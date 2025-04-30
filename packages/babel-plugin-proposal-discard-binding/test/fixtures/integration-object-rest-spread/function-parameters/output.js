const _excluded = ["p"];
function rest(_, _ref) {
  let {
      p: _2
    } = _ref,
    q = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return q;
}
