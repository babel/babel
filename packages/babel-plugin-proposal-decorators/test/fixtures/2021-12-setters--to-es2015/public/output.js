var _initProto, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "value", 1);
    _initProto(this);
  }
  set a(v) {
    return this.value = v;
  }
  set ['b'](v) {
    return this.value = v;
  }
}
_Foo = Foo;
[_initProto] = babelHelpers.applyDecs(_Foo, [[dec, 4, "a"], [dec, 4, 'b']], []);
