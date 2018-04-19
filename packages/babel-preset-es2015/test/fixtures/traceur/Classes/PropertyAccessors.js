class ImmutablePoint {
  get x () { return this.x_; }
  get y () { return this.y_; }
}

class MutablePoint {
  get x () { return this.x_; }
  set x (x) { this.x_ = x; }
  get y () { return this.y_; }
  set y (y) { this.y_ = y; }
}

// ----------------------------------------------------------------------------

var immutable = new ImmutablePoint();
expect(immutable.x).toBeUndefined();
expect(immutable.y).toBeUndefined();
immutable.x_ = 10;
immutable.y_ = 20;
expect(immutable.x).toBe(10);
expect(immutable.y).toBe(20);
expect(immutable.x_).toBe(10);
expect(immutable.y_).toBe(20);

try {
  immutable.x = 11;
  fail('should not be able to set a get only property');
} catch (except) {
}
try {
  immutable.y = 11;
  fail('should not be able to set a get only property');
} catch (except) {
}
expect(immutable.x).toBe(10);
expect(immutable.y).toBe(20);

var mutable = new MutablePoint();
expect(mutable.x).toBeUndefined();
expect(mutable.y).toBeUndefined();
mutable.x_ = 10;
mutable.y_ = 20;
expect(mutable.x).toBe(10);
expect(mutable.y).toBe(20);
expect(mutable.x_).toBe(10);
expect(mutable.y_).toBe(20);

try {
  mutable.x = 11;
} catch (except) {
  fail('should be able to set a read/write property');
}
try {
  mutable.y = 12;
} catch (except) {
  fail('should be able to set a read/write property');
}
expect(mutable.x).toBe(11);
expect(mutable.y).toBe(12);
