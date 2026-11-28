class S extends babelHelpers.structHeritage() {
  static {
    babelHelpers.defineStruct(S, true, o => o.#fields3, o => o.#init3);
  }
  constructor() {
    return babelHelpers.constructStruct(S, new.target, arguments) || super();
  }
  #fields;
  #init2() {}
  get #init() {
    return babelHelpers.structPrivateMethod(S, this.#init2, "#init");
  }
  #fields2;
  get fields2() {
    return this.#fields2;
  }
  set fields2(value) {
    this.#fields2 = value;
  }
  #fields3() {
    this.#fields = 1;
    this.#fields2 = 2;
  }
  #init3() {}
}
