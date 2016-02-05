var s = Symbol("s");
assert.ok((typeof s === "undefined" ? "undefined" : babelHelpers.typeof(s)) === "symbol");
assert.equal(typeof s === "undefined" ? "undefined" : babelHelpers.typeof(s), "symbol");
assert.equal(babelHelpers.typeof(babelHelpers.typeof(s.foo)), "symbol");
typeof s === "string";
