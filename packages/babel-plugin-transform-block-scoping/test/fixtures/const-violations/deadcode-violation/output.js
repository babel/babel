(function () {
  var a = "foo";
  if (false) a = ("false", babelHelpers.readOnlyError("a"));
  return a;
})();
