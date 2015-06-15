"use strict";

var s = Symbol("s");
assert.equal(typeof s === "undefined" ? "undefined" : babelHelpers._typeof(s), "symbol");
assert.equal(babelHelpers._typeof(babelHelpers._typeof(s.foo)), "symbol");
assert(typeof "abc" === "string");
assert(typeof 12 === "number");
assert(typeof x !== "boolean");
