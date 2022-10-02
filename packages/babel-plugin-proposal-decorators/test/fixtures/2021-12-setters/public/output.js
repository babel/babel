var _computedKey, _initProto;
const dec = () => {};
_computedKey = 'b';
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 4, "a"], [dec, 4, _computedKey]], []);
  }
  constructor(...args) {
    _initProto(this);
  }
  value = 1;
  set a(v) {
    return this.value = v;
  }
  set [_computedKey](v) {
    return this.value = v;
  }
}
