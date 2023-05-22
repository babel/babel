var _computedKey, _initStatic;
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
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(Foo, [[dec, 12, "a"], [dec, 12, _computedKey]], []).e;
  _initStatic(Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
