var _initClass, _initProto;
var value;
const classDec = Class => {
  value = new Class().m();
  return Class;
};
const memberDec = () => () => 42;
let _C;
class C {
  constructor(...args) {
    _initProto(this);
  }
  m() {}
}
({
  e: [_initProto],
  c: [_C, _initClass]
} = babelHelpers.applyDecs2303(C, [[[0, memberDec], 2, "m"]], [0, classDec]));
_initClass();
