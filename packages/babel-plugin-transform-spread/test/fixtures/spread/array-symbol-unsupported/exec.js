var a = (() => [2, 3])();

// Simulate old environment
global.Symbol = void 0;

expect([1, ...a]).toEqual([1, 2, 3]);
