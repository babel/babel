expect(
  (async function () {
    await using foo = {
      [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]: 3,
    };
  })()
).rejects.toThrow(TypeError);

expect(
  (async function () {
    await using foo = {
      [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]: 3,
    };
  })()
).rejects.toThrow("Object is not disposable.");

expect(
  (async function () {
    await using foo = {
      [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]: null,
      [Symbol.dispose || Symbol.for("Symbol.dispose")]() {},
    };
  })()
).rejects.toThrow("Object is not disposable.");
