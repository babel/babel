class C {
  static #x = 1;
  static m(obj) {
    const { #x: void, ...rest } = obj;
    return rest;
  }
  static n(obj) {
    const { #x: void, a: void, ...rest } = obj;
    return rest;
  }
}
expect(() => C.m(null)).toThrow(TypeError);
expect(() => C.n(null)).toThrow(TypeError);
expect(() => C.n(undefined)).toThrow(TypeError);
expect(C.n(C)).toEqual({});
