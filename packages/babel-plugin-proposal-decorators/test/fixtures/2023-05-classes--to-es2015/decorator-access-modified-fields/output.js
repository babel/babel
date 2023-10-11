var _initClass, _init_m, _class;
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
_class = C;
({
  e: [_init_m],
  c: [_C, _initClass]
} = babelHelpers.applyDecs2305(_class, [[memberDec, 0, "m"]], [classDec]));
_initClass();
