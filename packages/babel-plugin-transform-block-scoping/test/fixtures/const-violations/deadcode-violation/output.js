(function () {
  var a = "foo";
  if (false) a = (babelHelpers.readOnlyError("a"), "false");
  return a;
})();
