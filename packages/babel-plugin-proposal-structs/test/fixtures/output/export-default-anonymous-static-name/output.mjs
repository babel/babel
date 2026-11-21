let _struct;
const k = "name";
export default class extends babelHelpers.structHeritage(B) {
  static {
    _struct = this;
    babelHelpers.defineStruct(_struct, true, void 0, o => o.#init);
  }
  constructor() {
    return babelHelpers.constructStruct(_struct, new.target, arguments) || super();
  }
  static [k]() {}
  #init() {
    this.#super()();
  }
  #super() {
    return babelHelpers.structSuper(_struct, this);
  }
}
