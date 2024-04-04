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
).rejects.toThrow("Property [Symbol.asyncDispose] is not a function.");

expect(
  (async function () {
    await using foo = {
      [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]: null,
      [Symbol.dispose || Symbol.for("Symbol.dispose")]() {},
    };
  })()
).rejects.toThrow("Property [Symbol.asyncDispose] is not a function.");
