var _initProto, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  set a(v) {
    return this.value = v;
  }
  set ['b'](v) {
    return this.value = v;
  }
}
_Foo = Foo;
[_initProto] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 4, "a"], [dec, 4, 'b']]).e;
