function *outer() {
  try {
    yield* inner();
  } catch (err) {
    return -1;
  }
  return 1;
}

function *inner() {
  try {
    yield void 0;
  } catch (e) {
    return;
  }
}

var g = outer();
g.next();
assert.equal(g.throw(new Error('foo')).value, 1);
