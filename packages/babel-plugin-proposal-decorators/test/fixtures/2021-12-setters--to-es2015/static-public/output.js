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
  [_initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 9, "a"], [dec, 9, 'b']], []);
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
