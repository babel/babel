var s = Symbol("s");
assert.equal(typeof s, "symbol");
assert.equal(typeof typeof s.foo, "symbol");
