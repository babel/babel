var _initStatic, _class;
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
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 11, "a"], [dec, 12, "a"], [dec, 11, 'b'], [dec, 12, 'b']], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
