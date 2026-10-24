const _excluded = ["p"];
function rest(_, _ref) {
  var _2 = _ref.p,
    q = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return q;
}
