var _computedKey, _initStatic;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2301(this, [[dec, 8, "a"], [dec, 8, _computedKey]], []).e;
    _initStatic(this);
  }
  static value = 1;
  static get a() {
    return this.value;
  }
  static get [_computedKey]() {
    return this.value;
  }
}
