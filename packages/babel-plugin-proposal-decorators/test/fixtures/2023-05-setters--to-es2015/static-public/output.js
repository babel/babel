var _initStatic, _class;
const dec = () => {};
class Foo {
  static set a(v) {
    return this.value = v;
  }
  static set ['b'](v) {
    return this.value = v;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 12, "a"], [dec, 12, 'b']], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
