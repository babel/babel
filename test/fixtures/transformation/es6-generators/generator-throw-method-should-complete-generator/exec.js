function *gen(x) {
  yield 2;
  throw 1;
}

var u = gen();

u.next();

try {
  u.throw(2);
} catch (err) {
  assert.strictEqual(err, 2);
}

genHelpers.assertAlreadyFinished(u);
