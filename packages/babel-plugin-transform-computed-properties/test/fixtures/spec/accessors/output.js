var _obj;
var obj = (_obj = {}, babelHelpers.defineAccessor("get", _obj, foobar, function () {
  return "foobar";
}), babelHelpers.defineAccessor("set", _obj, foobar, function (x) {
  console.log(x);
}), babelHelpers.defineAccessor("get", _obj, "test", function () {
  return "regular getter after computed property";
}), babelHelpers.defineAccessor("set", _obj, "test", function (x) {
  console.log(x);
}), _obj);
