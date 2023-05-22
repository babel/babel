var _computedKey, _initStatic;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2305(this, [[dec, 12, "a"], [dec, 12, _computedKey]], []).e;
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
