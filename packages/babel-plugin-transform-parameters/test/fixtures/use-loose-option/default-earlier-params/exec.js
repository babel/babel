function f(a, b = a, c = b) { return c; }

expect(f(3)).toBe(3);
