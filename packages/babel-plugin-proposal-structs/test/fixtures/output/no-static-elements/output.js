class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, true, void 0, void 0, ["method"]);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  static method() {}
  method() {}
}
