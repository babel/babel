(function f(n) {
  if (n <= 0) {
    console.log(this, arguments);
    return "foo";
  }

  return Math.random() > 0.5 ? f.call(this, n - 1) : f.apply(this, [n - 1]);
})(1e6) === "foo";
