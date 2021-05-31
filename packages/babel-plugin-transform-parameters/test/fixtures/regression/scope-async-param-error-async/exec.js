const err = new Error();

async function f(a = (() => { throw err })()) {
  throw 1;
  var a = await a;
  return a;
}

return (async () => {
  let p;
  expect(() => { p = f() }).not.toThrow();
  await expect(p).rejects.toThrow(err);
})();
