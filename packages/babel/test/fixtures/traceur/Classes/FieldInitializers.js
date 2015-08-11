class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

// ----------------------------------------------------------------------------

var p = new Point();
assert.equal(0, p.x);
assert.equal(0, p.y);
p.x = 1;
assert.equal(1, p.x);

var p2 = new Point();
assert.equal(0, p2.x);
assert.equal(0, p2.y);
assert.equal(1, p.x);

for (var element in Point) {
  fail('Point contains static member : ' + element);
}
