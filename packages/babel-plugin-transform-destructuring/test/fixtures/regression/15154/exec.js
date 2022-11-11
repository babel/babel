expect(() => {
  var [] = { [Symbol.iterator]: () => [] };
}).not.toThrow();
