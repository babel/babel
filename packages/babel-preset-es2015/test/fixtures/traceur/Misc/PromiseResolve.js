var p = Promise.resolve(42);

expect(p).toBe(Promise.resolve(p));
