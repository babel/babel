return (async function () {
  let disposed = false;
  let beforeReturn;
  let inCatch;
  let inFinally;

  try {
    await using x = {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
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
})();
