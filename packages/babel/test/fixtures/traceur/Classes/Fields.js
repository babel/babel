class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

// ----------------------------------------------------------------------------

var p = new Point();

var keys = [];
for (var key in p) {
  keys.push(key);
}

assert.isTrue(keys.indexOf('x') !== -1);
assert.isTrue(keys.indexOf('y') !== -1);
assert.isTrue(keys.indexOf('constructor') === -1);
