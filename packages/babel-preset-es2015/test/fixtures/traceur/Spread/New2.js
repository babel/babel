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
expect(object instanceof object.F).toBe(false);
expect(object instanceof object.G).toBe(true);
expect(object.f instanceof object.F).toBe(true);
