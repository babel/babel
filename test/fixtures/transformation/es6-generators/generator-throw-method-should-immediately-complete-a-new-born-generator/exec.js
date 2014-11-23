var began = false;

function *gen() {
  began = true;
  yield 1;
}

var g = gen();
var exception = new Error("unhandled exception");
try {
  g.throw(exception);
  assert.ok(false, "should have thrown an exception");
} catch (err) {
  assert.strictEqual(err, exception);
  assert.strictEqual(began, false);
}
