var _a, _c, _e;
class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, false, o => o.#fields, void 0, [_c], [_a, _e]);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  [_a = babelHelpers.toPropertyKey(a())];
  [b()];
  ["literal"];
  [3];
  [_c = babelHelpers.toPropertyKey(c())]() {}
  static [d()] = 4;
  [_e = babelHelpers.toPropertyKey(e())];
  #fields(_a, _e) {
    this[_a] = 1;
    this["literal"] = 2;
    this[3] = 3;
    this[_e] = babelHelpers.setFunctionName(function () {}, _e);
  }
  static {
    babelHelpers.sealStruct(S);
  }
}
