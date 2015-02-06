(function f(n, /* should be undefined after first pass */ m) {
  if (n <= 0) {
    return "foo";
  }
  // Should be clean (undefined) on each pass
  var local;
  return f(n - 1);
})(1e6, true) === "foo";
