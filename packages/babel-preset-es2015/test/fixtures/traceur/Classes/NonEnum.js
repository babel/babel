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

assert.equal(0, Object.keys(B).length);
assert.equal(0, Object.keys(B.prototype).length);

assert.equal(0, Object.keys(D).length);
assert.equal(0, Object.keys(D.prototype).length);
