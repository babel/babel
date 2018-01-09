var s = Symbol("s");
assert.ok(babelHelpers.typeof(s) === "symbol");
assert.equal(babelHelpers.typeof(s), "symbol");
assert.equal(babelHelpers.typeof(babelHelpers.typeof(s.foo)), "symbol");
typeof s === "string";
assert.isNotOk((typeof o === "undefined" ? "undefined" : babelHelpers.typeof(o)) === "symbol");
assert.notEqual(typeof o === "undefined" ? "undefined" : babelHelpers.typeof(o), "symbol");
assert.notEqual(babelHelpers.typeof(babelHelpers.typeof(o.foo)), "symbol");
typeof o === "string";
