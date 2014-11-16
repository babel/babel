var executedFinally = false;

function *gen() {
  try {
    yield 0;
  } catch (err) {
    assert.ok(false, "should not have executed the catch handler");
  } finally {
    executedFinally = true;
  }
}

var g = gen();
assert.deepEqual(g.next(), { value: 0, done: false });

assert.deepEqual(g.return("argument"), {
  value: "argument",
  done: true
});

assert.strictEqual(executedFinally, true);
genHelpers.assertAlreadyFinished(g);
