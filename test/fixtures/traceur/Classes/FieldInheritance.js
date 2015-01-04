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
assert.isTrue(a.hasOwnProperty('x'));
assert.isTrue(a.hasOwnProperty('y'));
assert.isFalse(a.hasOwnProperty('z'));
assert.isUndefined(a.z);

var b = new Point3D();
assert.isTrue(b.hasOwnProperty('x'));
assert.isTrue(b.hasOwnProperty('y'));
assert.isTrue(b.hasOwnProperty('z'));
