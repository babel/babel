const _excluded = ["a"];
function g(_ref, b) {
  let {
      a
    } = _ref,
    rest = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return function* () {
    yield [a, rest, b];
  }();
}
