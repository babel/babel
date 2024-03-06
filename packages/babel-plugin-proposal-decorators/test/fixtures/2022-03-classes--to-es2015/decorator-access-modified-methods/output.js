var _C2;
let _initProto, _initClass;
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
} = babelHelpers.applyDecs2203R(_C2, [[memberDec, 2, "m"]], [classDec]));
_initClass();
