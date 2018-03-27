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

expect(keys).toContain('x');
expect(keys).toContain('y');
expect(keys).not.toContain('constructor');
