function G() {}

function F(x, y, z) {
  var obj = new G;
  obj.x = x;
  obj.y = y;
  obj.z = z;
  obj.f = this;
  obj.G = G;
  obj.F = F;
  return obj;
}

var object = new F(0, ...[1, 2]);

// ----------------------------------------------------------------------------

assert.equal(0, object.x);
assert.equal(1, object.y);
assert.equal(2, object.z);
assert.isFalse(object instanceof object.F);
assert.isTrue(object instanceof object.G);
assert.isTrue(object.f instanceof object.F);
