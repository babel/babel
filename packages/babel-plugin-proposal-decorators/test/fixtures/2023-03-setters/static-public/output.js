var _computedKey, _initStatic;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2303(this, [[[0, dec], 9, "a"], [[0, dec], 9, _computedKey]], []).e;
    _initStatic(this);
  }
  static value = 1;
  static set a(v) {
    return this.value = v;
  }
  static set [_computedKey](v) {
    return this.value = v;
  }
}
