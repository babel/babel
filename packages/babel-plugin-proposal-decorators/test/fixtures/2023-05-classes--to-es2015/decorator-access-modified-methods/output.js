var _initClass, _initProto, _class;
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
_class = C;
({
  e: [_initProto],
  c: [_C, _initClass]
} = babelHelpers.applyDecs2305(_class, [[memberDec, 2, "m"]], [classDec]));
_initClass();
