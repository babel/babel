class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ZeroPoint extends Point {
  constructor() {
    super(0, 0);
  }
}

assert.equal(new ZeroPoint().x, 0);
assert.equal(new ZeroPoint().y, 0);
