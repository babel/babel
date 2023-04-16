var _computedKey, _initProto;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2303(this, [[[0, dec], 2, "a"], [[0, dec], 2, _computedKey]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  a() {
    return this.value;
  }
  [_computedKey]() {
    return this.value;
  }
}
