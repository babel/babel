function* f(x = 1) {
  yield x;
}

for (var x of f(42)) {
  assert.equal(42, x);
}