var _initProto, _initClass;
var value;
const classDec = Class => {
  value = new Class().m();
  return Class;
};
const memberDec = () => () => 42;
let _C;
class C {
  static {
    ({
      e: [_initProto],
      c: [_C, _initClass]
    } = babelHelpers.applyDecs2311(this, [classDec], [[memberDec, 2, "m"]]));
  }
  constructor() {
    _initProto(this);
  }
  m() {}
  static {
    _initClass();
  }
}
