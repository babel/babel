let disposed = false;
let beforeReturn;
let inCatch;
let inFinally;

try {
  using x = {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      disposed = true;
      throw 1;
    },
  };
  beforeReturn = disposed;
  throw 0;
} catch (e) {
  inCatch = disposed;
  expect(e.name).toBe("SuppressedError");
  expect(e.suppressed).toBe(0);
  expect(e.error).toBe(1);
}

expect(beforeReturn).toBe(false);
expect(inCatch).toBe(true);
expect(disposed).toBe(true);
