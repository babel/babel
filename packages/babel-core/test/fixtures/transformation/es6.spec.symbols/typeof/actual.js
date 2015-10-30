var s = Symbol("s");
assert.ok(typeof s === "symbol");
assert.equal(typeof s, "symbol");
assert.equal(typeof typeof s.foo, "symbol");
typeof s === "string";
