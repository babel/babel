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
    assert.equal(this.x, 0);
    assert.equal(super.x++, 0);
    assert.equal(this.x, 1);
    assert.equal(super.x--, 1);
    assert.equal(this.x, 0);
  }
}

new C().m();
