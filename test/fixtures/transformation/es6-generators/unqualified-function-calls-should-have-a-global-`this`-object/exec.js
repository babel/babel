function getThis() {
  return this;
}

// This is almost certainly the global object, but there's a chance it
// might be null or undefined (in strict mode).
var unqualifiedThis = getThis();

function *invoke() {
  // It seems like a bug in the ES6 spec that we have to yield an
  // argument instead of just calling (yield)().
  return (yield "dummy")();
}

var g = invoke();
var info = g.next();

assert.deepEqual(info, { value: "dummy", done: false });

info = g.next(getThis);

// Avoid using assert.strictEqual when the arguments might equal the
// global object, since JSON.stringify chokes on circular structures.
assert.ok(info.value === unqualifiedThis);

assert.strictEqual(info.done, true);
