var _dec, _initProto, _B, _class;
const dec = () => {};
_dec = deco;
class A extends (_B = B) {
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
_class = A;
[_initProto] = babelHelpers.applyDecs2305(_class, [[_dec, 2, "method"]], [], 0, void 0, _B).e;
