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
assert.equal(1, p.x);
assert.equal(2, p.y);

var p2 = new Point(3, 4);
assert.equal(3, p2.x);
assert.equal(4, p2.y);
assert.equal(1, p.x);
assert.equal(2, p.y);

for (var element in Point) {
  fail('Point contains static member : ' + element);
}

// Tests to ensure that we're not binding function identifier per class
var a = new A();
var tmpA = A;
A = 42;
assert.equal(tmpA, a.classRef());
// IE does not have a name property on functions.
assert.isTrue(tmpA.name === 'A' || tmpA.name === undefined);
