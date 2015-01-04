function* f(x) {
  switch (yield x) {
    case 1:
      return 1;
    case 2:
      return 2;
    default:
      return 3;
  }
  throw new Error('Unreachable');
}

var g = f(1);
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(2), {value: 2, done: true});

g = f(3);
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(1), {value: 1, done: true});

var g = f(4);
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.next(55), {value: 3, done: true});
