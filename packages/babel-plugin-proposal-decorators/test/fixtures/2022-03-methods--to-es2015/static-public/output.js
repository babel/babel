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
  [_initStatic] = babelHelpers.applyDecs2203R(_class, [[dec, 7, "a"], [dec, 7, 'b']], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
