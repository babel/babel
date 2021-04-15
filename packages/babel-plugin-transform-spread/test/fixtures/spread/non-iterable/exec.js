var o = {};

expect(() => [...undefined]).toThrow(/undefined is not iterable|property 'Symbol\(Symbol\.iterator\)' of undefined/);

expect(() => [...o]).toThrow(/spread non-iterable/);

// Simulate old browser
global.Symbol = void 0;

expect(() => [...o]).toThrow(/spread non-iterable/);
