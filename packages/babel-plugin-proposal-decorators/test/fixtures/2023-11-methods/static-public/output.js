var _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2311(this, [], [[dec, 10, "a"], [dec, 10, 'b']]).e;
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
