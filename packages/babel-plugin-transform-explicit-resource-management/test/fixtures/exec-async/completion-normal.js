return async function () {
  let disposed = false;
  let beforeEnd;

  {
    await using x = {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        disposed = true;
      }
    };
    beforeEnd = disposed;
  }

  expect(beforeEnd).toBe(false);
  expect(disposed).toBe(true);
}();