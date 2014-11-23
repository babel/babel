function *outer() {
  try {
    yield* inner();
  } catch (err) {
    return -1;
  }
  return 1;
}

function *inner() {
  yield void 0;
}

var g = outer();
g.next();
assert.equal(g.throw(new Error('foo')).value, -1);
