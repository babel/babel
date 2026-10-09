return (async function () {
  let disposed = false;
  let awaited = false;
  let beforeEnd;
  {
    await using x = {
      [Symbol.dispose || Symbol.for("Symbol.dispose")]() {
        disposed = true;
      }
    };
    beforeEnd = disposed;
    Promise.resolve().then(() => {
      awaited = true;
    });
  }

  expect(beforeEnd).toBe(false);
  expect(disposed).toBe(true);
  expect(awaited).toBe(true);
})();
