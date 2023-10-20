var a = babelHelpers.defineProperty(babelHelpers.defineAccessor("get", {}, "x", function () {
  return 0;
}), "y", 1);
var b = babelHelpers.defineProperty(babelHelpers.defineAccessor("get", {}, "x", function () {
  return 0;
}), "x", 1);
var x = 1;
var y = babelHelpers.defineProperty(babelHelpers.defineAccessor("get", {
  x
}, "x", function () {
  return 0;
}), "x", x);
y.x = 2;
