"use strict";

// Test that for-await TDZ is preserved after transformation.
// In the original code, `x(a)` references the inner `a` which is in TDZ,
// so it should throw ReferenceError.
async function* gen() {
  yield { a: 1 };
}

async function method() {
  const { a } = { a: "outer" };
  for await (const { a } of gen(a)) {
    return a;
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
