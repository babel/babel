(function () {
  var a = "foo";
  if (false) a = (function () {
    throw new Error("\"a\" is read-only");
  }(), "false");
  return a;
})();
