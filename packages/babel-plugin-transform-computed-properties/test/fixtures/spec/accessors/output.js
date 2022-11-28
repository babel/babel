var _obj;
var obj = (_obj = {}, babelHelpers.defineAccessor(_obj, foobar, "get", function () {
  return "foobar";
}), babelHelpers.defineAccessor(_obj, foobar, "set", function (x) {
  console.log(x);
}), babelHelpers.defineAccessor(_obj, "test", "get", function () {
  return "regular getter after computed property";
}), babelHelpers.defineAccessor(_obj, "test", "set", function (x) {
  console.log(x);
}), _obj);
