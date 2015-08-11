function* f() {
  try {
  yield 1;
  } finally {
    return 2;
  }
  yield 3;
  return 4;
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: true});

function* f2() {
  try {
    yield 1
  } catch (ex) {
    yield ex;
  } finally {
    return 2;
  }
  yield 3;
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.next(), {value: 2, done: true});

g2 = f2();
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.throw(42), {value: 42, done: false});
assert.deepEqual(g2.next(), {value: 2, done: true});
