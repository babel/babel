let _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs(this, [[dec, 7, "a"], [dec, 7, 'b']], []);
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
