struct P {}
expect(Object.getOwnPropertyDescriptor(P.prototype, "constructor")).toEqual({
  value: P,
  writable: true,
  enumerable: false,
  configurable: false,
});

// A computed "constructor" method replaces the property
struct Q {
  ["constructor"]() {
    return 1;
  }
}
expect(Q.prototype.constructor.call(new Q())).toBe(1);
