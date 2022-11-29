var _a, _b, _x;
var a = (_a = {}, babelHelpers.defineAccessor(_a, "x", "get", function () {
  return 0;
}), babelHelpers.defineProperty(_a, "y", 1), _a);
var b = (_b = {}, babelHelpers.defineAccessor(_b, "x", "get", function () {
  return 0;
}), babelHelpers.defineProperty(_b, "x", 1), _b);
var x = (_x = {
  x
}, babelHelpers.defineAccessor(_x, "x", "get", function () {
  return 0;
}), babelHelpers.defineProperty(_x, "x", x), _x);
x.x = 1;
