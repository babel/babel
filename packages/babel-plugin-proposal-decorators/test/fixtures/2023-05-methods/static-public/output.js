var _computedKey, _initStatic;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2305(this, [[dec, 10, "a"], [dec, 10, _computedKey]], []).e;
    _initStatic(this);
  }
  static value = 1;
  static a() {
    return this.value;
  }
  static [_computedKey]() {
    return this.value;
  }
}
