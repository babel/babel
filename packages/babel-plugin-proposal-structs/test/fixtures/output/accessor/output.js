var _c;
class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, false, o => o.#fields, void 0, void 0, [_c]);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  #a;
  get a() {
    return this.#a;
  }
  set a(value) {
    this.#a = value;
  }
  #b2;
  get #b() {
    return this.#b2;
  }
  set #b(value) {
    this.#b2 = value;
  }
  #accessor;
  get [_c = babelHelpers.toPropertyKey(c())]() {
    return this.#accessor;
  }
  set [_c](value) {
    this.#accessor = value;
  }
  static accessor d = 4;
  #fields(_c) {
    this.#a = 1;
    this.#b2 = 2;
    this.#accessor = babelHelpers.setFunctionName(() => {}, _c);
  }
  static {
    babelHelpers.sealStruct(S);
  }
}
