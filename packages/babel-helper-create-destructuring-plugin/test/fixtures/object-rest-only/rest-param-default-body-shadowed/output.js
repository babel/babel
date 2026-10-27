const _excluded = ["a"];
var x = "outer";
function f(..._ref) {
  var [_ref2] = _ref,
    {
      a = () => x
    } = _ref2,
    r = babelHelpers.objectWithoutProperties(_ref2, _excluded);
  return function () {
    var x = "inner";
    return [a(), r];
  }();
}
