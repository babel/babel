function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

(function () {
  var a = "foo";
  if (false) a = (_readOnlyError("a"), "false");
  return a;
})();
