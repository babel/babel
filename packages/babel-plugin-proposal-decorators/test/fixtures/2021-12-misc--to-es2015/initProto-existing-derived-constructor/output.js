var _dec, _initProto, _A;
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
_A = A;
[_initProto] = babelHelpers.applyDecs(_A, [[_dec, 2, "method"]], []);
