class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
const atOrigin = new Point~(0, ?);
const p = atOrigin(1);
expect(p).toBeInstanceOf(Point);
expect(p).toEqual(new Point(0, 1));
expect(atOrigin(2)).not.toBe(p);
expect(atOrigin.length).toBe(1);
