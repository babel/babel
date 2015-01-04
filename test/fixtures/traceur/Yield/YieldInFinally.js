var x;

function* f() {
  x = 0;
  try {
    x++;
  } finally {
    yield x++;
  }
  yield x++;
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});

function* f2() {
  try {
    yield 1
  } catch (ex) {
    yield ex;
  } finally {
    yield 2;
  }
  yield 3;
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.next(), {value: 2, done: false});
assert.deepEqual(g2.next(), {value: 3, done: false});
assert.deepEqual(g2.next(), {value: undefined, done: true});

g2 = f2();
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.throw(42), {value: 42, done: false});
assert.deepEqual(g2.next(), {value: 2, done: false});
assert.deepEqual(g2.next(), {value: 3, done: false});
assert.deepEqual(g2.next(), {value: undefined, done: true});

