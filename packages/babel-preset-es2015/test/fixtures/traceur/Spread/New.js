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

expect(object.x).toBe(0);
expect(object.y).toBe(1);
expect(object.z).toBe(2);
expect(object.a).toBe(3);
expect(object.b).toBe(4);
expect(object.self).toBe(object);
expect(true).toBe(object instanceof object.F);
