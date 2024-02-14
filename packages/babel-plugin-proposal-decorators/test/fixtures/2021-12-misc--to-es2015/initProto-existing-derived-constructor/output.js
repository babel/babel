var _initProto, _methodDecs, _A;
const dec = () => {};
_methodDecs = deco;
class A extends B {
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
_A = A;
[_initProto] = babelHelpers.applyDecs(_A, [[_methodDecs, 2, "method"]], []);
