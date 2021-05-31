var a = (() => [1, 2, 3])();

// Simulate old environment
let _Symbol = Symbol;
Symbol = void 0;
try {
  let didErr = false, err;
  let obj = {};

  try {
    for (let i of a) {
      if (i === 2) throw obj;
    }
  } catch (e) {
    didErr = true;
    err = e;
  }

  expect(didErr).toBe(true);
  expect(obj).toBe(err);
} finally {
  Symbol = _Symbol;
}
