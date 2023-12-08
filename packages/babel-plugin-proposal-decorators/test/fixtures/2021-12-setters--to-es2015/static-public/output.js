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
  [_initStatic] = babelHelpers.applyDecs(_class, [[dec, 9, "a"], [dec, 9, 'b']], []);
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
