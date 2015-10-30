function assertClosed(g) {
  assert.deepEqual({value: undefined, done: true}, g.next());
}

function* f() {
  yield 1;
  try {
    yield 2;
    try {
      yield 3;
    } catch (ex) {
      yield 4 + ex;
    }
    yield 5;
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

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.throws(() => g.throw('ex'));
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.throw('ex'), {value: '6ex', done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: '4ex', done: false});
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.throw('ex'), {value: '4ex', done: false});
assert.deepEqual(g.throw('b'), {value: '6b', done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.throw('ex'), {value: '6ex', done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.deepEqual(g.next(), {value: undefined, done: true});
assertClosed(g);

g = f();
assert.deepEqual(g.next(), {value: 1, done: false});
assert.deepEqual(g.next(), {value: 2, done: false});
assert.deepEqual(g.next(), {value: 3, done: false});
assert.deepEqual(g.next(), {value: 5, done: false});
assert.deepEqual(g.next(), {value: 7, done: false});
assert.throws(() => g.throw('ex'));
assertClosed(g);
