function *usingThrow(condition) {
  yield 0;
  try {
    yield 1;
    throw 2;
    yield 3;
  } finally {
    if (condition) {
      yield 4;
      return 5;
    }
    yield 6;
    return 7;
  }
}

function *usingRaise(condition) {
  yield 0;
  try {
    yield 1;
    genHelpers.raise(2);
    yield 3;
  } finally {
    if (condition) {
      yield 4;
      return 5;
    }
    yield 6;
    return 7;
  }
}

// should execute finally blocks statically
genHelpers.check(usingThrow(true), [0, 1, 4], 5);
genHelpers.check(usingThrow(false), [0, 1, 6], 7);

// should execute finally blocks dynamically
genHelpers.check(usingRaise(true), [0, 1, 4], 5);
genHelpers.check(usingRaise(false), [0, 1, 6], 7);

// should execute finally blocks before throwing
var uncaughtError = new Error("uncaught");

function *uncaught(condition) {
  try {
    yield 0;
    if (condition) {
      yield 1;
      genHelpers.raise(uncaughtError);
    }
    yield 2;
  } finally {
    yield 3;
  }
  yield 4;
}

genHelpers.check(uncaught(false), [0, 2, 3, 4]);

var u = uncaught(true);

assert.deepEqual(u.next(), { value: 0, done: false });
assert.deepEqual(u.next(), { value: 1, done: false });
assert.deepEqual(u.next(), { value: 3, done: false });

try {
  u.next();
  assert.ok(false, "should have thrown an exception");
} catch (err) {
  assert.strictEqual(err, uncaughtError);
}

// should throw correct error when finally contains catch
var right = new Error("right");
var wrong = new Error("wrong");

function *gen() {
  try {
    yield 0;
    genHelpers.raise(right);
  } finally {
    yield 1;
    try {
      genHelpers.raise(wrong);
    } catch (err) {
      assert.strictEqual(err, wrong);
      yield 2;
    }
  }
}

var g = gen();

assert.deepEqual(g.next(), {
  value: 0,
  done: false
});

assert.deepEqual(g.next(), {
  value: 1,
  done: false
});

assert.deepEqual(g.next(), {
  value: 2,
  done: false
});

try {
  g.next();
  assert.ok(false, "should have thrown an exception");
} catch (err) {
  assert.strictEqual(err, right);
}
