var _computedKey, _initStatic, _class;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static a() {
    return this.value;
  }
  static [_computedKey]() {
    return this.value;
  }
}
_class = Foo;
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 10, "a"], [dec, 10, _computedKey]], []).e;
  _initStatic(_class);
})();
babelHelpers.defineProperty(Foo, "value", 1);
