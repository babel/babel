class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, false, o => o.#fields);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  y;
  #fields() {
    this.y = 1;
  }
  static {
    babelHelpers.sealStruct(S);
  }
}
