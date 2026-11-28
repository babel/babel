struct Point3D extends Point {
  z = 0;

  constructor(x, y, z) {
    super(x, y);
    const f = () => super(x, y);
    this.z = z;
  }
}

struct Root extends null {}
