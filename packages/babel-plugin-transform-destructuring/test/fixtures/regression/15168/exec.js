expect(() => {
  var [] = { [Symbol.iterator]: () => async function* () {} };
}).not.toThrow();
