class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

var point = new Point(1, 2);
var keys = [];

for (var key in point) {
  keys.push(key);
}

assert.equal(point.toString(), '(1, 2)');
assert.deepEqual(keys.sort(), ['x', 'y']);
