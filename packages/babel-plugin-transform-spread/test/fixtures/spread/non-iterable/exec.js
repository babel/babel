var o = {};

expect(() => [...undefined]).toThrow(/spread non-iterable/);

expect(() => [...o]).toThrow(/spread non-iterable/);

// Simulate old browser
Symbol = void 0;

expect(() => [...o]).toThrow(/spread non-iterable/);
