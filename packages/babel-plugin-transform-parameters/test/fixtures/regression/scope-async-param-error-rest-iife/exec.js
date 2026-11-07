// The body of an async function redeclaring its rest parameter is moved into
// an IIFE, but the errors of its other parameters must still reject.
async function f({ x }, ...rest) {
  function rest() {}
  return [x, typeof rest];
}

// The default value reads a body declaration: the parameters are moved into
// another IIFE, in the `try` statement of the first one.
async function g({ x } = y, ...rest) {
  function rest() {}
  var y;
  return [x, typeof rest];
}

return (async () => {
  let p, q;
  expect(() => {
    p = f(null);
    q = g();
  }).not.toThrow();
  await expect(p).rejects.toThrow(TypeError);
  await expect(q).rejects.toThrow(ReferenceError);
  expect(await f({ x: 1 }, 2)).toEqual([1, "function"]);
  expect(await g({ x: 1 })).toEqual([1, "function"]);
})();
