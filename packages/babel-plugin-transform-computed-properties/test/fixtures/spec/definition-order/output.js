var _a, _b, _y;
var a = (_a = {}, babelHelpers.defineAccessor("get", _a, "x", function () {
  return 0;
}), babelHelpers.defineProperty(_a, "y", 1));
var b = (_b = {}, babelHelpers.defineAccessor("get", _b, "x", function () {
  return 0;
}), babelHelpers.defineProperty(_b, "x", 1));
var x = 1;
var y = (_y = {
  x
}, babelHelpers.defineAccessor("get", _y, "x", function () {
  return 0;
}), babelHelpers.defineProperty(_y, "x", x));
y.x = 2;
