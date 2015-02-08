function f(n) {
  return n <= 0 ? "foo" : g(n - 1);
}

function g(n) {
  return n <= 0 ? "goo" : f(n - 1);
}
