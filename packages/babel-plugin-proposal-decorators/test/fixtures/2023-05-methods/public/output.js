var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2305(this, [[dec, 2, "a"], [dec, 2, 'b']], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  a() {
    return this.value;
  }
  ['b']() {
    return this.value;
  }
}
