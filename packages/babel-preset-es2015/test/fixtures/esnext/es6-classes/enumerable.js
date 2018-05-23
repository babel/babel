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

expect(point.toString()).toBe('(1, 2)');
expect(keys.sort()).toEqual(['x', 'y']);
