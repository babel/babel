class Point extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(Point, false, o => o.#fields, o => o.#init, ["distance"]);
  }
  constructor() {
    return babelHelpers.constructStruct(Point, new.target, arguments) || super();
  }
  x;
  y;
  #id;
  fn;
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
  #fields() {
    this.x = 0;
    this.#id = nextId();
    this.fn = babelHelpers.setFunctionName(() => {}, "fn");
  }
  #init(x, y) {
    this.x = x;
    this.y = y;
  }
  static {
    babelHelpers.sealStruct(Point);
  }
}
