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
  [_initStatic] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 11, "a"], [dec, 11, 'b']]).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
