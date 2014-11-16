function *range(n) {
  for (var i = 0; i < n; ++i) {
    yield i;
  }
}

genHelpers.check(range(0), []);

genHelpers.check(range(5), [0, 1, 2, 3, 4]);
