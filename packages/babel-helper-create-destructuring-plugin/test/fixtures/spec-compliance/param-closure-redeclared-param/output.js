const _excluded = ["a"];
function f(_ref, x) {
  let _ref$a = _ref.a,
    a = _ref$a === void 0 ? babelHelpers.setFunctionName(() => x, "a") : _ref$a,
    rest = babelHelpers.objectWithoutProperties(_ref, _excluded);
  return function (x) {
    var x = 2;
    return [a(), x, rest];
  }(x);
}
