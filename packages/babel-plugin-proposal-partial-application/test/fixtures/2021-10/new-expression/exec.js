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

// A member callee is not a receiver
const ns = {
  Pair: class {
    constructor(...args) {
      this.args = args;
      this.isNs = this === ns;
    }
  },
};
const xs = [1];
const pair = new ns.Pair~(...xs, ?, ...);
expect(pair(2, 3, 4).args).toEqual([1, 2, 3, 4]);
expect(pair(2).isNs).toBe(false);
expect(pair(2)).toBeInstanceOf(ns.Pair);
expect(pair.length).toBe(1);
