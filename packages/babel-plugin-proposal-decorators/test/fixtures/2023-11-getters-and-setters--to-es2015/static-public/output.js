var _initStatic, _Foo;
const dec = () => {};
class Foo {
  static get a() {
    return this.value;
  }
  static set a(v) {
    this.value = v;
  }
  static get ['b']() {
    return this.value;
  }
  static set ['b'](v) {
    this.value = v;
  }
}
_Foo = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 11, "a"], [dec, 12, "a"], [dec, 11, 'b'], [dec, 12, 'b']]).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
