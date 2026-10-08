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

// A partially applied constructor can also be called with `new`
const q = new atOrigin(3);
expect(q).toBeInstanceOf(Point);
expect(q).toEqual(new Point(0, 3));
