var _dec, _initProto, _class;
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
_class = A;
[_initProto] = babelHelpers.applyDecs(_class, [[_dec, 2, "method"]], []);
