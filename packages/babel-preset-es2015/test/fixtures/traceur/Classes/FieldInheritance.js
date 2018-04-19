class Point2D {
  constructor() {
    this.x = 1;
    this.y = 2;
  }
}

class Point3D extends Point2D {
  constructor() {
    super();
    this.z = 3;
  }
}

// ----------------------------------------------------------------------------

var a = new Point2D();
expect(a).toHaveProperty('x');
expect(a).toHaveProperty('y');
expect(a).not.toHaveProperty('z');
expect(a.z).toBeUndefined();

var b = new Point3D();
expect(b).toHaveProperty('x');
expect(b).toHaveProperty('y');
expect(b).toHaveProperty('z');
