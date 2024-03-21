let _initStatic;
const dec = () => {};
class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs(this, [[dec, 8, "a"], [dec, 9, "a"], [dec, 8, 'b'], [dec, 9, 'b']], []);
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
