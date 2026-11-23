// The generated label must not clash with the user's enclosing `init` label.
async function method() {
  init: {
    for await (const a of [() => a]) {
      return a();
    }
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
