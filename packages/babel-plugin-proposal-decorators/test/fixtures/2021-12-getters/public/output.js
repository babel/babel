var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 3, "a"], [dec, 3, 'b']], []);
  }
  value = (_initProto(this), 1);
  get a() {
    return this.value;
  }
  get ['b']() {
    return this.value;
  }
}
