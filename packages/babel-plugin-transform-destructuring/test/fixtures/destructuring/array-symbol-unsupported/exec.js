var a = (() => [1, 2, 3])();

// Simulate old environment
let _Symbol = Symbol;
Symbol = void 0;
try {
  var [first, ...rest] = a;

  expect(first).toBe(1);
  expect(rest).toEqual([2, 3]);
} finally {
  Symbol = _Symbol;
}
