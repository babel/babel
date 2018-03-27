class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get ORIGIN() {
    return new this(0, 0);
  }
}

expect(Point.ORIGIN).toEqual(new Point(0, 0));
