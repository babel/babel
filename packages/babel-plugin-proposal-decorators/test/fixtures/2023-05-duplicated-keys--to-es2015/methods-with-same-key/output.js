var _initProto, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    _initProto(this);
  }
  a() {
    return 1;
  }
  a() {
    return 2;
  }
}
_Foo = Foo;
[_initProto] = babelHelpers.applyDecs2305(_Foo, [[dec, 2, "a"], [dec, 2, "a"]], []).e;
