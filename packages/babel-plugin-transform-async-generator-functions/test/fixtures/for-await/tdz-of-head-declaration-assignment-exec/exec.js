// Assigning to the head declaration's `a` in the iterable must throw and
// must not touch the outer `a`.
let a = 0;

async function method() {
  for await (const a of (a = 1, [2])) {}
}

return method().then(
  function () {
    throw new Error("should have thrown");
  },
  function (err) {
    expect(err).toBeInstanceOf(ReferenceError);
    expect(a).toBe(0);
  }
);
