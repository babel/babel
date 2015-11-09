class B {
  constructor() {
    this._y = {v: 321};
    this._z = 1;
  }
  set x(value) {
    this._x = value;
  }
  get x() {
    return this._y;
  }
  getX() {
    return this._x;
  }
  getV() {
    return this._y.v
  }

  set z(v) {
    this._z = v;
  }
  get z() {
    return this._z;
  }
}

class C extends B {
  constructor() {
    super();
  }
  set x(value) {
    assert.equal(super.x = value, value);
  }
  set v(value) {
    return super.x.v = value;
  }
  inc(val) {
    assert.equal(super.z += val, 4);
  }
  incLookup(val) {
    assert.equal(super['z'] += val, 9);
  }
}

var c = new C;
c.x = 42;
assert.equal(42, c.getX());

c.v = 123;
assert.equal(123, c.getV());

c.inc(3);
assert.equal(4, c.z);

c.incLookup(5);
assert.equal(9, c.z);