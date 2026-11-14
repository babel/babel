class C {
  static #x = 1;
  static m({ #x: x }, y = x, ...rest) {
    return [x, y, rest];
  }
}
expect(C.m(C)).toEqual([1, 1, []]);
expect(C.m(C, 2, 3)).toEqual([1, 2, [3]]);
expect(() => C.m({})).toThrow(TypeError);
