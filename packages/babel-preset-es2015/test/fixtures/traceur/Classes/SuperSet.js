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
    expect(super.x = value).toBe(value);
  }
  set v(value) {
    return super.x.v = value;
  }
  inc(val) {
    expect(super.z += val).toBe(4);
  }
  incLookup(val) {
    expect(super['z'] += val).toBe(9);
  }
}

var c = new C;
c.x = 42;
expect(c.getX()).toBe(42);

c.v = 123;
expect(c.getV()).toBe(123);

c.inc(3);
expect(c.z).toBe(4);

c.incLookup(5);
expect(c.z).toBe(9);
