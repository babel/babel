var called = false;

async function noAwait(value) {
  called = true;
  return value;
}

var promise = noAwait("asdf");
assert.strictEqual(called, true);

promise.then(function(value) {
  assert.strictEqual(called, true);
  assert.strictEqual(value, "asdf");
  done();
}).catch(done);
