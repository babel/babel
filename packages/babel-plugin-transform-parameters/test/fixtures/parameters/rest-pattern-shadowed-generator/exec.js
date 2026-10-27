// The body of a function redeclaring a binding of its rest parameter pattern
// is moved into an IIFE, which must be a generator or async function too.
function* g(...[a]) {
  var a = 1;
  yield [a, this];
}
var self = {};
expect([...g.call(self, 0)]).toEqual([[1, self]]);

async function f(...[b]) {
  var b = 2;
  return [b, arguments.length];
}
async function* h(...[c]) {
  var c = 3;
  yield c;
}
// An error thrown while initializing the parameters rejects
async function k(...[{ d }]) {
  var d = 4;
  return d;
}
return (async () => {
  expect(await f(0, 0)).toEqual([2, 2]);
  const it = h(0);
  expect((await it.next()).value).toBe(3);
  expect((await it.next()).done).toBe(true);
  let p;
  expect(() => {
    p = k();
  }).not.toThrow();
  await expect(p).rejects.toThrow(TypeError);
})();
