var timeLimit = Date.now() + 1000;

assert.equal((function f(n) {
  assert.operator(Date.now(), '<', timeLimit, "Timeout");
  if (n <= 0) {
    return "foo";
  }
  return f(n - 1);
})(1e6), "foo");
