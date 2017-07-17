var s = Symbol("s");
assert.ok(typeof s === "symbol");
assert.equal(typeof s, "symbol");
assert.equal(typeof typeof s.foo, "symbol");
typeof s === "string";
assert.isNotOk(typeof o === "symbol");
assert.notEqual(typeof o, "symbol");
assert.notEqual(typeof typeof o.foo, "symbol");
typeof o === "string";
