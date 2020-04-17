var a = (() => [2, 3])();

// Simulate old environment
let _Symbol = Symbol;
Symbol = void 0;
try {
  expect([1, ...a]).toEqual([1, 2, 3]);
} finally {
  Symbol = _Symbol;
}
