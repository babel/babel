var s = Symbol("s");
assert.equal(typeof s, "symbol");
assert.equal(typeof typeof s.foo, "symbol");
assert(typeof "abc" === "string");
assert(typeof 12 === "number");
assert(typeof x !== "boolean");
