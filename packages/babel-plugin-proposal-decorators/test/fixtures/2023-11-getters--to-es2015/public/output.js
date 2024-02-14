var _initProto, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  get a() {
    return this.value;
  }
  get ['b']() {
    return this.value;
  }
}
_Foo = Foo;
[_initProto] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 3, "a"], [dec, 3, 'b']]).e;
