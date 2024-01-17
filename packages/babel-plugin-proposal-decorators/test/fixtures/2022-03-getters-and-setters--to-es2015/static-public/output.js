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
  [_initStatic] = babelHelpers.applyDecs2203R(_Foo, [[dec, 8, "a"], [dec, 9, "a"], [dec, 8, 'b'], [dec, 9, 'b']], []).e;
  _initStatic(_Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
