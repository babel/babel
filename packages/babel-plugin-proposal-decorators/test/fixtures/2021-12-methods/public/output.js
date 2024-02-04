var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 2, "a"], [dec, 2, 'b']], []);
  }
  value = (_initProto(this), 1);
  a() {
    return this.value;
  }
  ['b']() {
    return this.value;
  }
}
