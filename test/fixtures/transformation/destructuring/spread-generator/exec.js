function* f() {
  for (var i = 0; i < 3; i++) {
    yield i;
  }
}
var [...xs] = f();
assert.deepEqual(xs, [0, 1, 2]);
