class C {
  #x;
  static m(a, { #x: x }, ...b) {}
}
expect(C.m.length).toBe(2)
