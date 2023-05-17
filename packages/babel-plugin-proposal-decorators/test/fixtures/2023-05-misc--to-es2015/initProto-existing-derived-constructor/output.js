var _dec, _initProto;
const dec = () => {};
_dec = deco;
class A extends B {
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
[_initProto] = babelHelpers.applyDecs2305(A, [[_dec, 2, "method"]], []).e;
