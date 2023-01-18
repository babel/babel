var _computedKey, _initStatic;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static get a() {
    return this.value;
  }
  static get [_computedKey]() {
    return this.value;
  }
}
(() => {
  [_initStatic] = babelHelpers.applyDecs2203R(Foo, [[dec, 8, "a"], [dec, 8, _computedKey]], []).e;
  _initStatic(Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
