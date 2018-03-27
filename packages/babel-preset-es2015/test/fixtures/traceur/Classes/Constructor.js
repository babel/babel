class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class A {
  classRef() {
    return A;
  }
};

var p = new Point(1, 2);
expect(1).toBe(p.x);
expect(2).toBe(p.y);

var p2 = new Point(3, 4);
expect(3).toBe(p2.x);
expect(4).toBe(p2.y);
expect(1).toBe(p.x);
expect(2).toBe(p.y);

for (var element in Point) {
  fail('Point contains static member : ' + element);
}

// Tests to ensure that we're not binding function identifier per class
var a = new A();
var tmpA = A;
A = 42;
expect(tmpA).toBe(a.classRef());
// IE does not have a name property on functions.
expect(tmpA.name === 'A' || tmpA.name === undefined).toBe(true);
