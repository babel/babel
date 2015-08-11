function* f() {
  yield 1;
  yield 2;
  yield 3;
}

function* f1() {
  try {
    yield* [4, 5, 6];
  } catch (ex) {
    if (ex instanceof TypeError) {
      yield 10;
    }
  }
}

var g1 = f1();
assert.deepEqual(g1.next(), {value: 4, done: false});
assert.deepEqual(g1.throw(42), {value: 10, done: false});
assert.deepEqual(g1.next(), {value: undefined, done: true});

function* f2() {
  try {
    yield* f();
  } catch (ex) {
    yield ex;
  }
}

var g2 = f2();
assert.deepEqual(g2.next(), {value: 1, done: false});
assert.deepEqual(g2.throw(42), {value: 42, done: false});
assert.deepEqual(g2.next(), {value: undefined, done: true});

