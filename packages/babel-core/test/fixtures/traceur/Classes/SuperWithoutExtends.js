class C {
  constructor() {
    this.x = true;
  }
  static m() {
    return super.hasOwnProperty('m');
  }

  m() {
    return super.hasOwnProperty('x');
  }
}

assert.isTrue(new C().m());
assert.isTrue(C.m());
