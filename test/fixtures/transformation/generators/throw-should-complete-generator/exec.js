function *gen(x) {
  throw 1;
}

var u = gen();

try {
  u.next();
} catch (err) {
  assert.strictEqual(err, 1);
}

genHelpers.assertAlreadyFinished(u);
