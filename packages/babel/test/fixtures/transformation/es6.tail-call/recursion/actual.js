(function f(n, m = getDefaultValue()) {
  // `m` should be `getDefaultValue()` after first pass
  if (n <= 0) {
    return "foo";
  }
  // `local1`-`local3` should be fresh on each pass
  var local1;
  let local2;
  const local3 = 3;
  // `g` should be function here on each pass
  g = 123;
  function g() {}
  return f(n - 1);
})(1e6, true) === "foo";
