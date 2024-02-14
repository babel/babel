var _initProto, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "value", (_initProto(this), 1));
  }
  get a() {
    return this.value;
  }
  set a(v) {
    this.value = v;
  }
  get ['b']() {
    return this.value;
  }
  set ['b'](v) {
    this.value = v;
  }
}
_Foo = Foo;
[_initProto] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 3, "a"], [dec, 4, "a"], [dec, 3, 'b'], [dec, 4, 'b']]).e;
