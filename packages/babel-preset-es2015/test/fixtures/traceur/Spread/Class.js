class SpreadTestClass {
  constructor(x, y) {
    this.SpreadTestClass = SpreadTestClass;
    this.self = this;
    this.x = x;
    this.y = y;
  }
}

var object = new SpreadTestClass(...[0, 1]);

// ----------------------------------------------------------------------------

expect(object.x).toBe(0);
expect(object.y).toBe(1);
expect(object.self).toBe(object);
expect(object instanceof object.SpreadTestClass).toBe(true);
