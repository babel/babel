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
    expect(super.x = value).toBe(value);
  },
  set v(value) {
    return super.x.v = value;
  },
  inc(val) {
    expect(super.z += val).toBe(4);
  },
  incLookup(val) {
    expect(super['z'] += val).toBe(9);
  }
};

o.x = 42;
expect(o.getX()).toBe(42);

o.v = 123;
expect(o.getV()).toBe(123);

o.inc(3);
expect(o.z).toBe(4);

o.incLookup(5);
expect(o.z).toBe(9);
