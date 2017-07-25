function f(a, b = a, c = b) { return c; }

assert.equal(3, f(3));
