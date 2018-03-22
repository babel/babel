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

expect(new ZeroPoint().x).toBe(0);
expect(new ZeroPoint().y).toBe(0);
