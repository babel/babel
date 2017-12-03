export const tests = {

  'object spread' (test) {
    test.equals(
      { a: 1, b: 2, ...{ c: 3, d: 4 }, e: 5 },
      { a: 1, b: 2, c: 3, d: 4, e: 5 });
  },

  'spreading null and undefined' (test) {
    test.equals({ a: 1, ...null, b: 2 }, { a: 1, b: 2 });
    test.equals({ a: 1, ...undefined, b: 2 }, { a: 1, b: 2 });
  },

};
