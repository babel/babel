let _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2301(this, [[dec, 9, "a"], [dec, 9, 'b']], []).e;
    _initStatic(this);
  }
  static value = 1;
  static set a(v) {
    return this.value = v;
  }
  static set ['b'](v) {
    return this.value = v;
  }
}
