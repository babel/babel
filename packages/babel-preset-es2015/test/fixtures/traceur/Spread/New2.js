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

expect(object.x).toBe(0);
expect(object.y).toBe(1);
expect(object.z).toBe(2);
expect(object).not.toBeInstanceOf(object.F);
expect(object).toBeInstanceOf(object.G);
expect(object.f).toBeInstanceOf(object.F);
