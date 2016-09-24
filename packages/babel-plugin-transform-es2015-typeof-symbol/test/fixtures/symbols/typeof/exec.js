var s = Symbol("s");
assert.equal(typeof s, "symbol");
assert.ok(typeof s === "symbol");
assert.ok(typeof Symbol.prototype === 'object', "`typeof Symbol.prototype` should be 'object'");
