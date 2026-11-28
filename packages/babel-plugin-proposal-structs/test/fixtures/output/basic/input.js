struct Point {
  x = 0;
  y;
  #id = nextId();
  fn = () => {};

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get id() {
    return this.#id;
  }

  distance() {
    return Math.hypot(this.x, this.y);
  }

  static origin = new Point(0, 0);
  static {
    init(Point);
  }
}
