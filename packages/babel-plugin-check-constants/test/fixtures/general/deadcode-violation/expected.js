function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

(function () {
  var a = "foo";
  if (false) a = (_readOnlyError("a"), "false");
  return a;
})();
