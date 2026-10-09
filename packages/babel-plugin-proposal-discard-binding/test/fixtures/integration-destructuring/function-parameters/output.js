const _excluded = ["p"];
function rest(_, _ref) {
  let _2 = _ref.p,
    q = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return q;
}
