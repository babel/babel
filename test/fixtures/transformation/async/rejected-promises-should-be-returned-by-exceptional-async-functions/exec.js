var error = new Error("rejected");

async function e(arg) {
  if (arg) {
    throw arg;
  }
  return "did not throw";
}

async function f(arg) {
  return await e(arg);
}

async function g(arg) {
  return await f(arg);
}

async function h(arg) {
  return await Promise.all([
    g(arg),
    Promise.resolve("dummy")
  ]);
}

Promise.all([
  h(error).then(function() {
    done(new Error("should not have resolved"));
  }, function(e) {
    assert.strictEqual(e, error);
    return "ok1";
  }),
  h(null).then(function(result) {
    assert.deepEqual(result, [
      "did not throw",
      "dummy"
    ]);
    return "ok2";
  })
]).then(function(results) {
  assert.deepEqual(results, ["ok1", "ok2"]);
  done();
}).catch(done);
