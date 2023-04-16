var _initClass, _init_m;
var value;
const classDec = Class => {
  value = new Class().p;
  return Class;
};
const memberDec = () => () => 42;
let _C;
class C {
  constructor() {
    babelHelpers.defineProperty(this, "m", _init_m(this));
  }
}
({
  e: [_init_m],
  c: [_C, _initClass]
} = babelHelpers.applyDecs2303(C, [[[0, memberDec], 0, "m"]], [0, classDec]));
_initClass();
