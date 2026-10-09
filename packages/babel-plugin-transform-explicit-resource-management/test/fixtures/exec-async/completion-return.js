return async function () {
  let disposed = false;
  let beforeReturn;

  await async function () {
    await using x = {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        disposed = true;
      }
    };
    beforeReturn = disposed;
    return 0;
  }();

  expect(beforeReturn).toBe(false);
  expect(disposed).toBe(true);
}();