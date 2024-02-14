var _initClass, _init_m, _init_extra_m;
var value;
const classDec = Class => {
  value = new Class().p;
  return Class;
};
const memberDec = () => () => 42;
let _C;
class C {
  static {
    ({
      e: [_init_m, _init_extra_m],
      c: [_C, _initClass]
    } = babelHelpers.applyDecs2311(this, [classDec], [[memberDec, 0, "m"]]));
  }
  constructor() {
    _init_extra_m(this);
  }
  m = _init_m(this);
  static {
    _initClass();
  }
}
