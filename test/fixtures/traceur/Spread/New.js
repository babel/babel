function* G() {
  yield 3;
  yield 4;
}

function F(x, y, z, a, b) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.a = a;
  this.b = b;
  this.self = this;
  this.F = F;
}

var object = new F(0, ...[1, 2], ...G());

// ----------------------------------------------------------------------------

assert.equal(0, object.x);
assert.equal(1, object.y);
assert.equal(2, object.z);
assert.equal(3, object.a);
assert.equal(4, object.b);
assert.equal(object, object.self);
assert.isTrue(object instanceof object.F);
