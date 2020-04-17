function f(a, b = a, c = b) { return c; }

expect(3).toBe(f(3));
