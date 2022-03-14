class A {}
class B extends A {}

expect(Object.getOwnPropertyDescriptor(A, "prototype")).toEqual({
  value: A.prototype,
  configurable: false,
  enumerable: false,
  writable: false,
});

expect(Object.getOwnPropertyDescriptor(B, "prototype")).toEqual({
  value: B.prototype,
  configurable: false,
  enumerable: false,
  writable: false,
});
