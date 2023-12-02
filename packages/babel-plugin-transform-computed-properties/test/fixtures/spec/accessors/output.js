var obj = babelHelpers.defineAccessor("set", babelHelpers.defineAccessor("get", babelHelpers.defineAccessor("set", babelHelpers.defineAccessor("get", {}, foobar, function () {
  return "foobar";
}), foobar, function (x) {
  console.log(x);
}), "test", function () {
  return "regular getter after computed property";
}), "test", function (x) {
  console.log(x);
});
