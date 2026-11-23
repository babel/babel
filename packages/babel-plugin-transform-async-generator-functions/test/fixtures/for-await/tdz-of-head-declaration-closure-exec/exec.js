// The closure captures the head declaration's `x`, which stays in TDZ.
async function method() {
  for await (const x of [() => x]) {
    return x();
  }
}

return method().then(
  function () {
    throw new Error("should have thrown");
  },
  function (err) {
    expect(err).toBeInstanceOf(ReferenceError);
  }
);
