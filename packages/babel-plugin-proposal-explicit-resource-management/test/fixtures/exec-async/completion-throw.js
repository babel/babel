return async function () {
  let disposed = false;
  let beforeReturn;
  let inCatch;
  let inFinally;

  try {
    await using x = {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
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
}();