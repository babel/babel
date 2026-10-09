return expect(async function () {
  await using x = null;
}()).resolves.toBeUndefined();
