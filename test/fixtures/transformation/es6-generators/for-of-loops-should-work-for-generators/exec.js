function *range(n) {
  for (var i = 0; i < n; ++i) {
    yield i;
  }
}

var value, values = [];
for (value of range(3))
  values.push(value);
assert.deepEqual(values, [0, 1, 2]);
