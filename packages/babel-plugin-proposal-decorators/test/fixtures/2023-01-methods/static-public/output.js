let _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2301(this, [[dec, 7, "a"], [dec, 7, 'b']], []).e;
    _initStatic(this);
  }
  static value = 1;
  static a() {
    return this.value;
  }
  static ['b']() {
    return this.value;
  }
}
