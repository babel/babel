(function () {
  var a = "foo";
  if (false) "false", babelHelpers.readOnlyError("a");
  return a;
})();
