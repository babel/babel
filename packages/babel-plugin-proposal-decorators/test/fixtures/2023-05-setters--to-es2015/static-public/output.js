var _computedKey, _initStatic, _class;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static set a(v) {
    return this.value = v;
  }
  static set [_computedKey](v) {
    return this.value = v;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 12, "a"], [dec, 12, _computedKey]], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
