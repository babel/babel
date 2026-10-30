// transform-parameters moves the body into an IIFE first: the object rest
// pattern is destructured in the `try` statement rejecting its errors.
async function f({ ...o }, ...rest) {
  function rest() {}
  return [o, typeof rest];
}

return (async () => {
  let p;
  expect(() => {
    p = f(null);
  }).not.toThrow();
  await expect(p).rejects.toThrow(TypeError);
  expect(await f({ a: 1 })).toEqual([{ a: 1 }, "function"]);
})();
