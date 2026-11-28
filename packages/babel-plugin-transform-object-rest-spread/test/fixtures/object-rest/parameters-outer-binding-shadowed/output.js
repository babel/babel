const _excluded = ["y"];
const z = 1;
function f(_ref) {
  let {
      y = z
    } = _ref,
    rest = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return function () {
    var z = 2;
  }();
}
