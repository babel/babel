var p = {
  _y: {v: 321},
  _z: 1,

  set x(value) {
    this._x = value;
  },
  get x() {
    return this._y;
  },
  getX() {
    return this._x;
  },
  getV() {
    return this._y.v;
  },
  set z(v) {
    this._z = v;
  },
  get z() {
    return this._z;
  },
};

var o = {
  __proto__: p,
  set x(value) {
    assert.equal(super.x = value, value);
  },
  set v(value) {
    return super.x.v = value;
  },
  inc(val) {
    assert.equal(super.z += val, 4);
  },
  incLookup(val) {
    assert.equal(super['z'] += val, 9);
  }
};

o.x = 42;
assert.equal(42, o.getX());

o.v = 123;
assert.equal(123, o.getV());

o.inc(3);
assert.equal(4, o.z);

o.incLookup(5);
assert.equal(9, o.z);
