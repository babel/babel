return expect(async function () {
  await using foo = { [Symbol.asyncDispose || Symbol.for("Symbol.asyncDispose")]: 3 };
}()).rejects.toThrow(TypeError);
