class Point {
  getX() {
    assert.equal(this.x, 3); // C
  }
}

class ColorPoint extends Point {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    assert.equal(this.x, 3);   // A
    assert.equal(super.x, undefined);  // B
  }

  m() {
    this.getX();
  }
}

const cp = new ColorPoint();
cp.m();
