Symbol.metadata = Symbol();

class A {}

expect(A.hasOwnProperty(Symbol.metadata)).toBe(false);
