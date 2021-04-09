var o = {};

expect(() => [...undefined]).toThrow(/undefined is not iterable/);

expect(() => [...o]).toThrow(/spread non-iterable/);

// Simulate old browser
global.Symbol = void 0;

expect(() => [...o]).toThrow(/spread non-iterable/);
