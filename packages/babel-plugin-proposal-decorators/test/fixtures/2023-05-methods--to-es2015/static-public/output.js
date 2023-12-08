var _initStatic, _class;
const dec = () => {};
class Foo {
  static a() {
    return this.value;
  }
  static ['b']() {
    return this.value;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 10, "a"], [dec, 10, 'b']], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
