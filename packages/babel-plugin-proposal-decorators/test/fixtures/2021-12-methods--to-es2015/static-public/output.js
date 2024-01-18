var _initStatic, _Foo;
const dec = () => {};
class Foo {
  static a() {
    return this.value;
  }
  static ['b']() {
    return this.value;
  }
}
_Foo = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 7, "a"], [dec, 7, 'b']], []);
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
