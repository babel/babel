var x = "outside";
function outer() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : babelHelpers.setFunctionName(function () {
    return x;
  }, "a");
  return function () {
    var x = "inside";
    return a();
  }();
}
outer();
