function assertClosed(g) {
  assert.deepEqual({value: undefined, done: true}, g.next());
}

function* f() {
  yield 1;
  try {
    yield 2;
    yield 3;
  } catch (ex) {
    yield ex;
  }
  yield 4;
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.throw('ex'), {value: 'ex', done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: 'ex', done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.throws(() => g.throw('ex'));
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.throws(() => g.throw('ex'));
assertClosed(g);
