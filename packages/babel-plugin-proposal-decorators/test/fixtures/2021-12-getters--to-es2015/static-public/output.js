var _initStatic, _Foo;
const dec = () => {};
class Foo {
  static get a() {
    return this.value;
  }
  static get ['b']() {
    return this.value;
  }
}
_Foo = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs(_Foo, [[dec, 8, "a"], [dec, 8, 'b']], []);
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
