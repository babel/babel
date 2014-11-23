var error = new Error("rejected");

async function f(arg) {
  try {
    return await arg;
  } catch (e) {
    assert.strictEqual(e, error);
    return "did throw";
  }
}

Promise.all([
  f(Promise.reject(error)),
  f(Promise.resolve("did not throw"))
]).then(function(results) {
  assert.deepEqual(results, [
    "did throw",
    "did not throw"
  ]);
  done();
}).catch(done);
