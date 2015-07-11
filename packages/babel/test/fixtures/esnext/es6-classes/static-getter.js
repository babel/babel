class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get ORIGIN() {
    return new this(0, 0);
  }
}

assert.deepEqual(Point.ORIGIN, new Point(0, 0));