class B {
  constructor() {
    this._x = 0;
  }
  get x() {
    return this._x;
  }
  set x(x) {
    this._x = x;
  }
}

class C extends B {
  m() {
    expect(this.x).toBe(0);
    expect(++super.x).toBe(1);
    expect(this.x).toBe(1);
    expect(--super.x).toBe(0);
    expect(this.x).toBe(0);

    expect(typeof super.x).toBe('number');
  }
}

new C().m();
