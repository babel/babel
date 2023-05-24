return async function () {
  let disposed = false;
  let beforeEnd;

  const err = {};
  let thrown;

  try {
    await using x = {
      async [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        throw err;
      }
    };
  } catch (e) {
    thrown = e;
  }

  expect(thrown).toBe(err);
}();