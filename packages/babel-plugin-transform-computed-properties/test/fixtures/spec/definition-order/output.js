var _a, _b, _x;
var a = (_a = {}, babelHelpers.defineAccessor("get", _a, "x", function () {
  return 0;
}), babelHelpers.defineProperty(_a, "y", 1), _a);
var b = (_b = {}, babelHelpers.defineAccessor("get", _b, "x", function () {
  return 0;
}), babelHelpers.defineProperty(_b, "x", 1), _b);
var x = (_x = {
  x
}, babelHelpers.defineAccessor("get", _x, "x", function () {
  return 0;
}), babelHelpers.defineProperty(_x, "x", x), _x);
x.x = 1;
