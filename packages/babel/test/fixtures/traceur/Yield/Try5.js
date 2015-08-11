function assertClosed(g) {
  assert.deepEqual({value: undefined, done: true}, g.next());
}

var x;

function* f() {
  x = 0;
  yield 1;
  try {
    yield 2;
    try {
      yield 3;
    } finally {
      x = 4
    }
    yield x;
  } catch (ex) {
    yield 5 + ex;
  }
  yield 6;
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.next(), {value: 6, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 4);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.throws(() => g.throw('ex'));
assertClosed(g);
assert.equal(x, 0);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.throw('ex'), {value: '5ex', done: false});
assert.deepEqual(g.next(), {value: 6, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 0);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.throw('ex'), {value: '5ex', done: false});
assert.throws(() => g.throw('b'));
assertClosed(g);
assert.equal(x, 0);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: '5ex', done: false});
assert.deepEqual(g.next(), {value: 6, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 4);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: '5ex', done: false});
assert.throws(() => g.throw('b'));
assertClosed(g);
assert.equal(x, 4);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.throw('ex'), {value: '5ex', done: false});
assert.deepEqual(g.next(), {value: 6, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 4);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 4, done: false});
assert.deepEqual(g.throw('ex'), {value: '5ex', done: false});
assert.throws(() => g.throw('b'));
assertClosed(g);
assert.equal(x, 4);
