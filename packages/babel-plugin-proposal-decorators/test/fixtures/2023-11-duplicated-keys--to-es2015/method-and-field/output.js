var _initProto, _init_a, _init_extra_a, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "a", (_initProto(this), _init_a(this, 123)));
    _init_extra_a(this);
  }
  a() {
    return 1;
  }
}
_Foo = Foo;
[_init_a, _init_extra_a, _initProto] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 0, "a"], [dec, 2, "a"]]).e;
