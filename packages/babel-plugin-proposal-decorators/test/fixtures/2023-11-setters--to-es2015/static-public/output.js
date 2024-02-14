var _initStatic, _Foo;
const dec = () => {};
class Foo {
  static set a(v) {
    return this.value = v;
  }
  static set ['b'](v) {
    return this.value = v;
  }
}
_Foo = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 12, "a"], [dec, 12, 'b']]).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
