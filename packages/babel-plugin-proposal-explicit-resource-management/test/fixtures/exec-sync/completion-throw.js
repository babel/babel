let disposed = false;
let beforeReturn;
let inCatch;
let inFinally;

try {
  using x = {
    [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
      disposed = true;
    }
  };
  beforeReturn = disposed;
  throw 0;
} catch {
  inCatch = disposed;
}

expect(beforeReturn).toBe(false);
expect(inCatch).toBe(true);
expect(disposed).toBe(true);
