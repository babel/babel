function* fn() {}

expect(fn.constructor.displayName).toBe("GeneratorFunction");
