class S extends babelHelpers.structHeritage(Base) {
  static {
    babelHelpers.defineStruct(S, true, o => o.#fields, o => o.#init);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  x;
  y;
  f;
  #fields() {
    this.x = init();
    this.f = babelHelpers.setFunctionName(() => {}, "f");
  }
  #init(x) {
    this.#super()();
  }
  #super() {
    return babelHelpers.structSuper(S, this);
  }
}
