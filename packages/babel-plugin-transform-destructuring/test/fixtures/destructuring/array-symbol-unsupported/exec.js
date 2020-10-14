var a = (() => [1, 2, 3])();

// Simulate old environment
global.Symbol = void 0;

var [first, ...rest] = a;

expect(first).toBe(1);
expect(rest).toEqual([2, 3]);
