var _initClass, _init_m, _C2;
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
_C2 = C;
({
  e: [_init_m],
  c: [_C, _initClass]
} = babelHelpers.applyDecs2301(_C2, [[memberDec, 0, "m"]], [classDec]));
_initClass();
