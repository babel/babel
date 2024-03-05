var _initProto, _methodDecs, _A;
const dec = () => {};
class A extends B {
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
_A = A;
(() => {
  _methodDecs = deco;
  [_initProto] = babelHelpers.applyDecs(_A, [[_methodDecs, 2, "method"]], []);
})();
