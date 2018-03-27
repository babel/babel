var p = {
  _x: 0,
  get x() {
    return this._x;
  },
  set x(x) {
    this._x = x;
  },
};

var o = {
  __proto__: p,
  m() {
    expect(this.x).toBe(0);
    expect(++super.x).toBe(1);
    expect(this.x).toBe(1);
    expect(--super.x).toBe(0);
    expect(this.x).toBe(0);

    expect(typeof super.x).toBe('number');
  }
};

o.m();
