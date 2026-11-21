class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, true, o => o.#fields, o => o.#init);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  x;
  #fields() {
    this.x = 1;
  }
  #init(a: any) {}
}
