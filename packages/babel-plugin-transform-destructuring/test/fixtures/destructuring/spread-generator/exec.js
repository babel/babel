function* f() {
  for (var i = 0; i < 3; i++) {
    yield i;
  }
}
var [...xs] = f();
expect(xs).toEqual([0, 1, 2]);
