return async function () {
  let disposed = false;
  let beforeBreak;

  while (true) {
    await using x = {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        disposed = true;
      }
    };
    beforeBreak = disposed;
    break;
  }

  expect(beforeBreak).toBe(false);
  expect(disposed).toBe(true);
}();