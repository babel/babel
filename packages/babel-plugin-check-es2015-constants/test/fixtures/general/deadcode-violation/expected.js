(function () {
  var a = "foo";

  if (false) {
    throw new Error("\"a\" is read-only");
    a = "false";
  }

  return a;
})();