var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2301(this, [[dec, 4, "a"], [dec, 4, 'b']], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  set a(v) {
    return this.value = v;
  }
  set ['b'](v) {
    return this.value = v;
  }
}
