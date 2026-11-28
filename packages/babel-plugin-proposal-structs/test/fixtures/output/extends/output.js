class Point3D extends babelHelpers.structHeritage(Point) {
  static {
    babelHelpers.defineStruct(Point3D, true, o => o.#fields, o => o.#init);
  }
  constructor() {
    return babelHelpers.constructStruct(Point3D, new.target, arguments) || super();
  }
  z;
  #fields() {
    this.z = 0;
  }
  #init(x, y, z) {
    this.#super()(x, y);
    const f = () => this.#super()(x, y);
    this.z = z;
  }
  #super() {
    return babelHelpers.structSuper(Point3D, this);
  }
}
class Root extends babelHelpers.structHeritage(null) {
  static {
    babelHelpers.defineStruct(Root, true);
  }
  constructor() {
    return babelHelpers.constructStruct(Root, new.target, arguments) || super();
  }
}
