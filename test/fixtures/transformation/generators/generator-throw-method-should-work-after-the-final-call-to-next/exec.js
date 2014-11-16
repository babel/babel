function *gen() {
  yield 1;
}

var g = gen();
assert.deepEqual(g.next(), { value: 1, done: false });

var exception = new Error("unhandled exception");
try {
  g.throw(exception);
  assert.ok(false, "should have thrown an exception");
} catch (err) {
  assert.strictEqual(err, exception);
}
