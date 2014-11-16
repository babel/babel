function a(sent) {
  assert.strictEqual(sent, 1);
  a.called = true;
}

function b(sent) {
  assert.strictEqual(sent, 2);
  b.called = true;
  return { callee: b };
}

function *gen() {
  assert.ok(!a.called);
  assert.ok(!b.called);
  for (var key in a(yield 0), b(yield 1)) {
    assert.ok(a.called);
    assert.ok(b.called);
    assert.strictEqual(yield key, 3);
  }

  for (var key in a(1), { foo: "foo", bar: "bar" }) {
    yield key;
  }
}

genHelpers.check(gen(), [0, 1, "callee", "foo", "bar"]);
