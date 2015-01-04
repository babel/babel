function* f(x, y) {
  yield x, yield y;
  return x + y;
}

var g = f(1, 2);
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(1), {value: 2, done: false});
assert.deepEqual(g.next(2), {value: 3, done: true});
