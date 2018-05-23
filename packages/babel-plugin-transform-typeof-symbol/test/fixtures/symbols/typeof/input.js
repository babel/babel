var s = Symbol("s");
expect(typeof s).toBe("symbol");
expect(typeof typeof s.foo).toBe("symbol");
typeof s === "string";
expect(typeof o).not.toBe("symbol");
expect(typeof typeof o.foo).not.toBe("symbol");
typeof o === "string";
