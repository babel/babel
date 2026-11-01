const visitor = {
  Function: function Function(fn, args) {
    return fn(...args);
  },
};

expect(visitor.Function((a, b) => a + b, [1, 2])).toBe(3);
