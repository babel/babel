var s = Symbol("s");
expect(typeof s).toBe("symbol");
expect(typeof Symbol.prototype).toBe("object");
expect(typeof o).not.toBe("symbol");
expect(typeof typeof o).not.toBe("symbol");
typeof o === "string";
