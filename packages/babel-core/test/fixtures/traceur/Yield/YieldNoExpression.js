function sum(x, y) {
  return x + y;
}

function* f() {
  yield;
  yield sum(yield, yield);
  return yield;
}

var g = f(42);

assert.deepEqual(g.next(), {value: undefined, done: false});
assert.deepEqual(g.next(), {value: undefined, done: false});
assert.deepEqual(g.next(3), {value: undefined, done: false});
assert.deepEqual(g.next(39), {value: 42, done: false});
assert.deepEqual(g.next(), {value: undefined, done: false});
assert.deepEqual(g.next('abc'), {value: 'abc', done: true});
assert.deepEqual(g.next(), {value: undefined, done: true});
