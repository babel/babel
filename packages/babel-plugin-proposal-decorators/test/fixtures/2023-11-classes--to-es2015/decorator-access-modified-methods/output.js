var _initProto, _initClass, _C2;
var value;
const classDec = Class => {
  value = new Class().m();
  return Class;
};
const memberDec = () => () => 42;
let _C;
class C {
  constructor() {
    _initProto(this);
  }
  m() {}
}
_C2 = C;
({
  e: [_initProto],
  c: [_C, _initClass]
} = babelHelpers.applyDecs2311(_C2, [classDec], [[memberDec, 2, "m"]]));
_initClass();
