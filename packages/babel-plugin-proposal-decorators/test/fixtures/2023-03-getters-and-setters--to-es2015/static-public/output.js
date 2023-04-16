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
  [_initStatic] = babelHelpers.applyDecs2303(Foo, [[[0, dec], 8, "a"], [[0, dec], 9, "a"], [[0, dec], 8, _computedKey], [[0, dec], 9, _computedKey2]], []).e;
  _initStatic(Foo);
})();
babelHelpers.defineProperty(Foo, "value", 1);
