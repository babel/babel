var s = Symbol("s");
expect(babelHelpers.typeof(s)).toBe("symbol");
expect(babelHelpers.typeof(babelHelpers.typeof(s.foo))).toBe("symbol");
typeof s === "string";
expect(typeof o === "undefined" ? "undefined" : babelHelpers.typeof(o)).not.toBe("symbol");
expect(babelHelpers.typeof(babelHelpers.typeof(o.foo))).not.toBe("symbol");
typeof o === "string";
