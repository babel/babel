var _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2311(this, [], [[dec, 11, "a"], [dec, 11, 'b']]).e;
    _initStatic(this);
  }
  static value = 1;
  static get a() {
    return this.value;
  }
  static get ['b']() {
    return this.value;
  }
}
