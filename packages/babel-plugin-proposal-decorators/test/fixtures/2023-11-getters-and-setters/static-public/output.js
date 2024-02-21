var _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs2311(this, [], [[dec, 11, "a"], [dec, 12, "a"], [dec, 11, 'b'], [dec, 12, 'b']]).e;
    _initStatic(this);
  }
  static value = 1;
  static get a() {
    return this.value;
  }
  static set a(v) {
    this.value = v;
  }
  static get ['b']() {
    return this.value;
  }
  static set ['b'](v) {
    this.value = v;
  }
}
