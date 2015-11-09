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
assert.equal(undefined, immutable.x);
assert.equal(undefined, immutable.y);
immutable.x_ = 10;
immutable.y_ = 20;
assert.equal(10, immutable.x);
assert.equal(20, immutable.y);
assert.equal(10, immutable.x_);
assert.equal(20, immutable.y_);

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
assert.equal(10, immutable.x);
assert.equal(20, immutable.y);

var mutable = new MutablePoint();
assert.equal(undefined, mutable.x);
assert.equal(undefined, mutable.y);
mutable.x_ = 10;
mutable.y_ = 20;
assert.equal(10, mutable.x);
assert.equal(20, mutable.y);
assert.equal(10, mutable.x_);
assert.equal(20, mutable.y_);

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
assert.equal(11, mutable.x);
assert.equal(12, mutable.y);
