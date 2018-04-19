class B {
  a() {}
  get b() {}
  set c(v) {}
  static d() {}
  static get e() {}
  static set f(v) {}
}

class D extends B {
  g() {}
  get h() {}
  set i(v) {}
  static j() {}
  static get k() {}
  static set l(v) {}
}

expect(Object.keys(B)).toHaveLength(0);
expect(Object.keys(B.prototype)).toHaveLength(0)

expect(Object.keys(D)).toHaveLength(0)
expect(Object.keys(D.prototype)).toHaveLength(0)
