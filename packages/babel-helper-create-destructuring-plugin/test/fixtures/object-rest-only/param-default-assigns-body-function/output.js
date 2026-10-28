const _excluded = ["v"];
var y = "outer";
function f(..._ref) {
  let {
      v = y = 5
    } = _ref,
    h = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return function () {
    return y;
    function y() {}
  }();
}
