let _struct;
export default class extends babelHelpers.structHeritage(Base) {
  static {
    _struct = this;
    babelHelpers.defineStruct(_struct, true, o => o.#fields);
  }
  constructor() {
    return babelHelpers.constructStruct(_struct, new.target, arguments) || super();
  }
  x;
  #fields() {
    this.x = 1;
  }
}
