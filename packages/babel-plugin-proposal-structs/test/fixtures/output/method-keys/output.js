var _c;
class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, true, void 0, void 0, ["a", "b", "1", _c, "d", ["e"], ["f"], ["g"]]);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  a() {}
  "b"() {}
  1() {}
  [_c = babelHelpers.toPropertyKey(c())]() {}
  ["d"]() {}
  get e() {}
  *f() {}
  async g() {}
  #h2() {}
  get #h() {
    return babelHelpers.structPrivateMethod(S, this.#h2, "#h");
  }
  static i() {}
}
