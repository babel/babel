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
    assert.equal(this.x, 0);
    assert.equal(++super.x, 1);
    assert.equal(this.x, 1);
    assert.equal(--super.x, 0);
    assert.equal(this.x, 0);

    // Don't use assert.typeOf since we are testing typeof.
    assert.equal(typeof super.x, 'number');
  }
};

o.m();
