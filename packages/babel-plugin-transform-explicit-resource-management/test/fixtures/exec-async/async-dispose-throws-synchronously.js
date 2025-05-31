return (async function () {
  let disposed = false;
  let beforeEnd;

  const err1 = {};
  const err2 = {};
  let thrown;

  try {
    await using x = {
      [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]() {
        throw err1;
      },
    };
    throw err2;
  } catch (e) {
    thrown = e;
  }

  expect(thrown.suppressed).toBe(err2);
  expect(thrown.error).toBe(err1);
})();
