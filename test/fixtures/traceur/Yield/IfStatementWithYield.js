function* f(x) {
  if (yield x) {
    return 2;
  }
  return 3;
}

var g = f(1);
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(true), {value: 2, done: true});

g = f(4);
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.next(false), {value: 3, done: true});
