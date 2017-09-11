var s = Symbol("s");
assert.equal(typeof s, "symbol");
assert.ok(typeof s === "symbol");
assert.ok(typeof Symbol.prototype === 'object', "`typeof Symbol.prototype` should be 'object'");
assert.isNotOk(typeof o === "symbol");
assert.notEqual(typeof o, "symbol");
assert.notEqual(typeof typeof o, "symbol");
typeof o === "string";
