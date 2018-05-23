class Point {
  constructor() {
    this.x = 0;
    this.y = 0;
  }
}

// ----------------------------------------------------------------------------

var p = new Point();
expect(p.x).toBe(0);
expect(p.y).toBe(0);
p.x = 1;
expect(p.x).toBe(1);

var p2 = new Point();
expect(p2.x).toBe(0);
expect(p2.y).toBe(0);
expect(p.x).toBe(1);

for (var element in Point) {
  fail('Point contains static member : ' + element);
}
