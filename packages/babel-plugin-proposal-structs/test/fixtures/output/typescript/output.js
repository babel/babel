class S<T> extends babelHelpers.structHeritage(Base)<T> implements I {
  static {
    babelHelpers.defineStruct(S, true, o => o.#fields, o => o.#init);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  x: T;
  y: number;
  #fields() {
    this.x = init();
  }
  #init(x: T) {
    this.#super()();
  }
  #super() {
    return babelHelpers.structSuper(S, this);
  }
}
