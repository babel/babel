(function f(n) {
  return n <= 0 ? "foo" : (doSmth(), getTrueValue() && (getFalseValue() || f(n - 1)));
})(1e6, true) === "foo";
