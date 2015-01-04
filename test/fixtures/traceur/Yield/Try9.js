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
    } catch (ex) {
      yield 4 + ex;
    } finally {
      x = 5;
    }
    yield x;
  } catch (ex) {
    yield 6 + ex;
  }
  yield 7;
}

var g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 5);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.throws(() => g.throw('ex'));
assertClosed(g);
assert.equal(x, 0);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.throw('ex'), {value: '6ex', done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 0);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.throw('ex'), {value: '6ex', done: false});
assert.throws(() => g.throw('b'));
assertClosed(g);
assert.equal(x, 0);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: '4ex', done: false});
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 5);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: '4ex', done: false});
assert.deepEqual(g.throw('b'), {value: '6b', done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 5);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.throw('ex'), {value: '6ex', done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);
assert.equal(x, 5);
