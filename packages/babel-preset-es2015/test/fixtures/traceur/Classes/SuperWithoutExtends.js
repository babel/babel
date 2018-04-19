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

expect(new C().m()).toBe(true);
expect(C.m()).toBe(true);
