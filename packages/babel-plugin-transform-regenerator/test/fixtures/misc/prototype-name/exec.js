function* f() {}

expect(f.constructor.name).toBe("GeneratorFunction");
expect(f.constructor.displayName).toBe("GeneratorFunction");

expect(f.prototype[Symbol.toStringTag]).toBe("Generator");
