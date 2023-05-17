var _computedKey, _initStatic;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2305(this, [[dec, 11, "a"], [dec, 11, _computedKey]], []).e;
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
