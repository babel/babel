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
  [_initStatic] = babelHelpers.applyDecs(Foo, [[dec, 9, "a"], [dec, 9, _computedKey]], []);
  _initStatic(Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
