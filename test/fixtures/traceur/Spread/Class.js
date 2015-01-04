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

assert.equal(object.x, 0);
assert.equal(object.y, 1);
assert.equal(object.self, object);
assert.isTrue(object instanceof object.SpreadTestClass);
