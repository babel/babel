function* gen() {
  try {
    yield 1;
  } finally {
    throw 2;
  }
}

return async function () {
  let err;
  try {
    for await (const _ of gen()) break;
  } catch (e) {
    err = e;
  }

  expect(err).toBe(2);
}()
