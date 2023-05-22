var _computedKey, _computedKey2, _initStatic;
const dec = () => {};
_computedKey = 'b';
_computedKey2 = 'b';
class Foo {
  static get a() {
    return this.value;
  }
  static set a(v) {
    this.value = v;
  }
  static get [_computedKey]() {
    return this.value;
  }
  static set [_computedKey2](v) {
    this.value = v;
  }
}
(() => {
  [_initStatic] = babelHelpers.applyDecs2305(Foo, [[dec, 11, "a"], [dec, 12, "a"], [dec, 11, _computedKey], [dec, 12, _computedKey2]], []).e;
  _initStatic(Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
